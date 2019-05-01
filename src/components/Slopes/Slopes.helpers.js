import { checkIntersection } from 'line-intersect';

import {
  getDistanceToBezierCurve,
  getValuesForBezierCurve,
} from '../../helpers/line.helpers';
import {
  clamp,
  normalize,
  getDistanceBetweenPoints,
  convertPolarToCartesian,
  convertCartesianLineToPolar,
  mix,
} from '../../utils';

export const occludeLineIfNecessary = (
  line,
  previousLines,
  width,
  height,
  polarRatio
) => {
  if (previousLines.length === 0) {
    return line;
  }

  // For all of our calculations, we'll convert our line's cartesian coordinates
  // into polar ones, using the 'occlusion point' as the center.
  //
  // This works because polar coordinates [theta, radius] can be thought of as
  // [x, y] - 'theta' is just a range from 0 to 2PI, and `radius` is the
  // distance to the center (similar to the 'Y' distance).
  //
  // Because our line can be anywhere on the straight-to-circle spectrum,
  // depending on `polarRatio`, we'll make a "best guess" for where the
  // occlusion should be.

  // Traditionally, in cartesian terms, we haven't had an occlusion point;
  // we just look for which value is closest to the top of the canvas.
  // We can "fake" it, though, by selecting an X value between the two points,
  // and a Y value right at the top.
  const cartesianOcclusionPoint = [
    // X
    (line[0][0] + line[1][0]) / 2,
    // Y
    height,
  ];

  const centerPoint = [width / 2, height / 2];

  const mixRatio = polarRatio > 0.5 ? 1 : polarRatio * 2;

  const occlusionPoint = [
    mix(centerPoint[0], cartesianOcclusionPoint[0], mixRatio),
    mix(centerPoint[1], cartesianOcclusionPoint[1], mixRatio),
  ];

  const polarLine = convertCartesianLineToPolar(line, occlusionPoint);

  const polarSlope = polarLine[1][1] - polarLine[0][1];

  const previousPolarLines = previousLines.map(line =>
    convertCartesianLineToPolar(line, occlusionPoint)
  );

  const lineDistances = line.map(point =>
    getDistanceBetweenPoints(point, occlusionPoint)
  );

  ////// TODO: Optimize by precalculating this?
  // const previousLineDistances = previousLines.map(line =>
  //   line.map(point => getDistanceBetweenPoints(point, occlusionPoint))
  // );

  /**
   * 1. Totally below
   *
   * Check if this line is totally obscured by a single previous line.
   * In rare cases, this segment won't be visible because it sits below
   * multiple lines, none of which obscure this line entirely... but that case
   * is caught further down.
   */
  const isTotallyBelow = previousLines.some(previousLine => {
    const previousLineDistances = previousLine.map(point =>
      getDistanceBetweenPoints(point, occlusionPoint)
    );

    return (
      lineDistances[0] < previousLineDistances[0] &&
      lineDistances[1] < previousLineDistances[1]
    );
  });

  if (isTotallyBelow) {
    return null;
  }

  /**
   * 2. Partially obscured.
   *
   * Check if this line intersects with previous lines, and draw a shorter
   * segment if so. We'll need to keep track of the intersections, as the same
   * segment might intersect with multiple lines.
   */
  let becomeOccludedAt;
  let breakFreeAt;
  let becomeOccludedFromIndex;
  let breakFreeFromIndex;

  previousPolarLines.forEach(function handlePartialObscured(
    previousPolarLine,
    i
  ) {
    // See if our two lines intersect, in the segments given.
    let { type, point } = checkIntersection(
      polarLine[0][0],
      polarLine[0][1],
      polarLine[1][0],
      polarLine[1][1],
      previousPolarLine[0][0],
      previousPolarLine[0][1],
      previousPolarLine[1][0],
      previousPolarLine[1][1]
    );

    // `checkIntersection` returns a point in {x, y} format, instead of [x, y].
    // Convert it, for consistency with our points
    // Also: The point is actually specified in polar coordinates. We'll need
    // to convert it back at some point.
    point = point && [point.x, point.y];

    if (type === 'intersecting') {
      const previousPolarSlope =
        previousPolarLine[1][1] - previousPolarLine[0][1];

      // It's weird to think of polar coordinates as having a "slope".
      // It's important to do this using polar coordinates and not cartesian
      // ones, though, because the curves wrap around the center point, and
      // I want the 'radius' to be treated the same regardless of angle.
      //
      // TODO: I wonder if this would work by using cartesian coordinates, but
      // transposing the x/y axes so that [0, 0] was in the center... I think
      // I'd still have problems, since it's not sufficient to just split it
      // into 4 quadrants.

      // If our current slope is greater than the previous slope, it means
      // that our line is currently occluded and breaking free.
      // If the current slope is < the previous, it means our line is currently
      // free, but is about to dip behind the previous line.
      const isBecomingOccludedByThisLine = polarSlope < previousPolarSlope;
      const isBreakingFreeFromThisLine = !isBecomingOccludedByThisLine;

      if (isBecomingOccludedByThisLine) {
        // We want to set this as the earliest occluding line, unless we
        // already have one earlier.
        const currentRecord = becomeOccludedAt && becomeOccludedAt[0];

        if (typeof currentRecord === 'undefined' || currentRecord > point[0]) {
          becomeOccludedAt = point;
          becomeOccludedFromIndex = i;
        }
      } else if (isBreakingFreeFromThisLine) {
        const currentRecord = breakFreeAt && breakFreeAt[0];

        if (typeof currentRecord === 'undefined' || currentRecord < point[0]) {
          breakFreeAt = point;
          breakFreeFromIndex = i;
        }
      }
    }
  });

  // If we didn't find any intersections, our job is done. The line is totally
  // unobscured.
  if (!becomeOccludedAt && !breakFreeAt) {
    return line;
  }

  /*
  Earlier, the comments mention that it's possible for a line to be totally
  obscured, even if no single previousLine is entirely above it. Eg:

    \        /
      \    /
        \/
    ---X--X--------   < Our line, which is occluded at the first X, and breaks
    /      \           free at the second X, is hidden because the occlusion
  /          \         happens first.
  */
  if (becomeOccludedAt && breakFreeAt && becomeOccludedAt[0] < breakFreeAt[0]) {
    return null;
  }

  let [start, end] = line;

  // Convert our becomeOccludedAt and breakFreeAt points to cartesian
  // coordinates, now that we've done all calculations.
  if (becomeOccludedAt) {
    becomeOccludedAt = convertPolarToCartesian(becomeOccludedAt);

    becomeOccludedAt = [
      becomeOccludedAt[0] + occlusionPoint[0],
      becomeOccludedAt[1] + occlusionPoint[1],
    ];

    // in polar lines, we don't know which of the two line points is first.
    // eg. `/` or `\` are both possible.
    const earliestPointIndex = line[0][0] < line[1][0] ? 0 : 1;

    const earliestPoint = line[earliestPointIndex];
    const latestPoint = line[1 - earliestPointIndex];

    const isWildlyOutsideRange =
      becomeOccludedAt[0] > latestPoint[0] ||
      becomeOccludedAt[0] < earliestPoint[0];

    if (isWildlyOutsideRange) {
      const intersectingLine = previousLines[becomeOccludedFromIndex];

      let { point } = checkIntersection(
        line[0][0],
        line[0][1],
        line[1][0],
        line[1][1],
        intersectingLine[0][0],
        intersectingLine[0][1],
        intersectingLine[1][0],
        intersectingLine[1][1]
      );

      if (point) {
        becomeOccludedAt = [point.x, point.y];
      }
    }

    end = becomeOccludedAt;
  }

  if (breakFreeAt) {
    breakFreeAt = convertPolarToCartesian(breakFreeAt);

    breakFreeAt = [
      breakFreeAt[0] + occlusionPoint[0],
      breakFreeAt[1] + occlusionPoint[1],
    ];

    // in polar lines, we don't know which of the two line points is first.
    // eg. `/` or `\` are both possible.
    const earliestPointIndex = line[0][0] < line[1][0] ? 0 : 1;

    const earliestPoint = line[earliestPointIndex];
    const latestPoint = line[1 - earliestPointIndex];

    const isWildlyOutsideRange =
      breakFreeAt[0] > latestPoint[0] || breakFreeAt[0] < earliestPoint[0];

    if (isWildlyOutsideRange) {
      const intersectingLine = previousLines[breakFreeFromIndex];

      let { point } = checkIntersection(
        line[0][0],
        line[0][1],
        line[1][0],
        line[1][1],
        intersectingLine[0][0],
        intersectingLine[0][1],
        intersectingLine[1][0],
        intersectingLine[1][1]
      );

      if (point) {
        breakFreeAt = [point.x, point.y];
      }
    }

    start = breakFreeAt;
  }

  return [start, end];
};

export const getMarginSize = height => {
  // Change the size of margins by tweaking this number:
  const WIDTH_IN_INCHES = 0.1;

  return Math.round((height / 11) * WIDTH_IN_INCHES);
};

export const getPossiblyOccludingRowIndices = ({
  rowIndex,
  rowHeight,
  amplitudeRatio,
  distanceBetweenRows,
}) => {
  // The largest possible peak will be `rowHeight * amplitudeRatio`px tall.
  // If our rowHeight is 100px, and our distanceBetweenRows is 20, we know that
  // we need to check up to 5 previous rows, since a max peak will be 100px
  // tall, and 100px below.
  const theoreticalMaxHeight = rowHeight * amplitudeRatio;

  // That said, the theoretical max never seems to actually happen.
  // For optimization, I can reduce this number a bit without risking a
  // break in occlusion
  const practicalMaxHeight = theoreticalMaxHeight * 0.5;

  const maxNumOfOccludingRows = Math.ceil(
    practicalMaxHeight / distanceBetweenRows
  );

  const lowestRowIndex = Math.max(0, rowIndex - maxNumOfOccludingRows);

  const possiblyOccludingRowIndices = [];
  let cursor = rowIndex - 1;

  while (cursor >= lowestRowIndex) {
    possiblyOccludingRowIndices.push(cursor);
    cursor--;
  }

  return possiblyOccludingRowIndices;
};

export const getDampingAmountForSlopes = ({
  sampleIndex,
  samplesPerRow,
  verticalRatio,
  curve,
  curveStrength,
}) => {
  const horizontalRatio = sampleIndex / samplesPerRow;

  const distanceToBezier = getDistanceToBezierCurve({
    point: [horizontalRatio, verticalRatio],
    curve,
    resolution: 15,
  });

  // For some reason, `distanceToBezier` is capable of being juuuust over `1`.
  // Like, 1.00004. Because of that, 'dampingAmount' could be negative, which
  // doesn't make sense. Rather than continue digging, I'm taking the lazy way
  // out, and just clamping it in the expected range.
  const dampingAmount = clamp(1 - distanceToBezier, 0, 1);

  // By default, our bezier curve damping has a relatively modest effect.
  // If we want to truly isolate the peaks to the center of the page, we need
  // to raise that effect exponentially.
  return dampingAmount ** curveStrength;
};

/** Given a cartesian point, figure out what that point would be in polar
 * coordinates, and then convert it back to cartesian coordinates.
 *
 * This is super confusing (sorry, future-Josh!), but essentially we want to
 * convert our cartesian coordinates to be circular, while still returning
 * X/y values so it can be plotted.
 *
 * For example, `sampleIndex` is our defacto `x` in cartesian-land, but we can
 * also think of it as the degrees in polar coordinates. Let's say we have 500
 * samplesPerRow:
 *   - 125/500 is 1/4 of the canvas width, but it can also be 90-degrees (out of
 *     the 360 degrees we want for a circular effect).
 *   - 250/500 is 1/2 the width, or 180-degrees.
 *
 * Meanwhile, our Y values represent how far away we are from the top of the
 * canvas, but it could also be the `radius` of our polar coordinate!
 **/
export const plotAsPolarCoordinate = ({
  point,
  width,
  height,
  sampleIndex,
  samplesPerRow,
  omegaRatio,
  omegaRadiusSubtractAmount,
  polarTanRatio = 0,
  polarTanMultiplier = 0,
  radiusMultiple = 1,
}) => {
  // Normalize the value from 0π to 2π, and then add 0.5π.
  // The added 0.5π is so that the slopes point upwards, instead of to the left.
  // It's effectively a way to rotate by 90deg.
  const theta =
    normalize(sampleIndex, 0, samplesPerRow - 1, 0, 2 * Math.PI) +
    Math.PI * 0.5;

  const radius =
    mix(omegaRadiusSubtractAmount - point[1], point[1], omegaRatio) *
    radiusMultiple;

  const polarPoint = [theta, radius];

  let [x, y] = convertPolarToCartesian(polarPoint);

  // TODO: This is really cool, but maybe not as good as without it?
  // // `polarTanRatio` and `polarTanMultiplier` use Math.tan instead of Math.sin
  // // for calculating the polar-to-cartesian values for Y. This creates a
  // // "Split universe" effect where lines divide the left and right halves.
  // const splitUniverseY = radius * Math.tan(theta) * polarTanMultiplier;

  // y = mix(splitUniverseY, y, polarTanRatio);

  const centeredPolarPoint = [x + width / 2, y + height / 2];

  return centeredPolarPoint;
};

export const getPerlinValueWithOctaves = (
  noiseGenerator,
  x,
  y,
  rootAmplitude,
  numOfOctaves
) => {
  // It's possible for `numOfOctaves` to be a fraction.
  // This allows us to smoothly go between steps (no sudden jump from 1 to 2).
  // Essentially we just need to make sure that the final octave, if not a
  // round number, takes that fraction into account.
  // eg. if it's 2.5, the 3rd octave will have a 0.5 multiplier (in addition
  // to the `multiple` already quieting down higher octaves.)
  const maxNumToIterate = Math.ceil(numOfOctaves);

  let value = 0;
  let cursor = 1;
  while (cursor <= maxNumToIterate) {
    // Every additional octave is quieter than the one before it.
    const frequencyMultiple = 2 ** cursor;
    let amplitudeMultiple = 1 / frequencyMultiple;

    // We also need to factor in if this is the final octave and it's not at
    // full foce (eg. the 5th octave with 4.5 octaves).
    if (cursor - numOfOctaves > 0) {
      amplitudeMultiple *= numOfOctaves % 1;
    }

    const frequency = x * frequencyMultiple;
    const amplitude = rootAmplitude * amplitudeMultiple;

    const octaveVal = noiseGenerator(frequency, y) * amplitude;

    value += octaveVal;

    cursor++;
  }

  return value;
};

export const takeStaticIntoAccount = (
  staticRatio,
  sampleIndex,
  rowIndex,
  rndBase
) => {
  // We have two possible effects: applying Math.tan on the sampleIndex for an
  // interesting left-right approach, and applying Math.tan on the rowIndex
  // for a top-down one.
  //
  // A single slider controls the mixes of these 2 effects:
  // - At 0, both effects are at 0.
  // - from 0-33, the Column effect goes from 0 to 1.
  // - from 33-66, column effect stays at 1
  // - from 66-100, column effect drops back down to 0
  // - from 66-100, row effect goes from 0 to 1
  //
  // TODO: Do I actually want rowEffect? Maybe it muddies it up too much :/

  // I'll use a bezier curve to map the value for the column.
  const columnCurve = {
    startPoint: [0, 0],
    controlPoint1: [0.5, 2],
    endPoint: [1, 0],
  };

  const MAX_MULTIPLIER = 1.5;
  const MIN_MULTIPLIER = -MAX_MULTIPLIER;

  let [, columnEffectStrength] = getValuesForBezierCurve(
    columnCurve,
    staticRatio
  );

  // Since rowEffectStrength only rises towards the end, I'll do a lerp.
  const rowEffectStrength = clamp(normalize(staticRatio, 0, 1, -1, 1), 0, 1);

  // The "values" are the numbers we actually want to use as multipliers within
  // Math.tan. These are literally magic numbers: I don't understand them, but
  // they look good?
  const columnEffectValue = normalize(staticRatio, 0, 1, 2.5, 3.65);
  const rowEffectValue = normalize(staticRatio, 0, 1, 10, 9);

  const columnEffectMultiplier =
    Math.tan(sampleIndex * columnEffectValue) * 0.5;
  const rowEffectMultiplier = Math.tan(rowIndex * rowEffectValue) * 0.5;

  const multiplier = clamp(
    columnEffectMultiplier * columnEffectStrength +
      rowEffectMultiplier * rowEffectStrength,
    MIN_MULTIPLIER,
    MAX_MULTIPLIER
  );

  return rndBase + rndBase * multiplier;
};

export const getNumOfUsableRows = (
  width,
  height,
  numOfRows,
  polarRatio,
  polarTanRatio,
  omegaRatio,
  rowOffsets
) => {
  // If the user has spaced out the rows a bunch, some might be spilling off
  // the edge of the canvas. We don't have to worry about those rows. In
  // addition to the potential perf win of not computing unused lines, it
  // also means we can apply the Bezier curve dampening in an intuitive way.
  let index;

  // Note that `omegaRatio` and `polarTanRatio` are harder to predict.
  // If these values are >0, we shouldn't try and optimize.
  if (polarTanRatio > 0 || omegaRatio > 0) {
    return numOfRows;
  }

  if (polarRatio < 0.1) {
    // The first 10% of the range is cartesian-like.
    // In this mode, we just need to look for negative offsets, sinnce the
    // spill-over always happens at the top of the canvas.
    index = rowOffsets.findIndex(offset => offset < 0);
  } else if (polarRatio > 0.85) {
    // In the top end of the range, rowOffsets are distances from the center
    // of the canvas. In this case, we need to look for rowOffsets that are too
    // large to fit in the canvas.
    //
    // We can imagine the "radius" of our canvas being the distance between one
    // of the corners and the center point. This is the largest distance from
    // the center to any part of the canvas.
    //
    // If the row offset is greater than this radius, it can't be visible on the
    // canvas.

    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const radius = Math.sqrt(halfWidth ** 2 + halfHeight ** 2);

    index = rowOffsets.findIndex(offset => offset > radius);
  } else {
    return numOfRows;
  }

  // If we weren't able to find an index of the first row outside our visible
  // canvas, that means we want to render all rows
  if (index === -1) {
    return numOfRows;
  }

  // By looking at the rowOffset exclusively, it's possible we'll still see
  // rows near the edge "flicker out", as each row can move in a negative
  // direction and dip into the canvas.
  //
  // Rather than solve this the "proper" way using rowHeight and amplitude, I'm
  // just going to return 1 more row than required. This is a rough
  // approximation, but it appears to work just fine.
  return index + 1;
};

export const joinLineSegments = lines => {
  return lines.reduce((acc, line, index) => {
    const [startPoint, endPoint] = line;

    if (index === 0) {
      return [line];
    }

    const previousLine = acc[acc.length - 1];
    const previousLineEnd = previousLine[previousLine.length - 1];

    if (
      previousLineEnd[0] === startPoint[0] &&
      previousLineEnd[1] === startPoint[1]
    ) {
      acc[acc.length - 1].push(endPoint);
    } else {
      acc.push(line);
    }

    return acc;
  }, []);
};

const createBoundaryChecker = (width, height) => point => {
  const outsideX = point[0] > 0 && point[0] < width;
  const outsideY = point[1] > 0 && point[1] < height;

  return outsideX && outsideY;
};

export const removeTroublesomeLines = (width, height, lines) => {
  const checkBoundaries = createBoundaryChecker(width, height);

  return lines.filter(([p1, p2]) => {
    const distance = getDistanceBetweenPoints(p1, p2);

    return distance < 100 && (checkBoundaries(p1) || checkBoundaries(p2));
  });
};
