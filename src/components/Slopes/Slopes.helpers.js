import { checkIntersection } from 'line-intersect';

import { getDistanceToBezierCurve } from '../../helpers/line.helpers';
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

  previousPolarLines.forEach((previousPolarLine, i) => {
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

export const getPossiblyOccludingRowIndices = ({
  rowIndex,
  rowHeight,
  distanceBetweenRows,
}) => {
  // The largest possible peak will be `rowHeight`px tall.
  // If our rowHeight is 100px, and our distanceBetweenRows is 20, we know that
  // we need to check up to 5 previous rows, since a max peak will be 100px
  // tall, and 100px below.
  const maxNumOfOccludingRows = Math.ceil(rowHeight / distanceBetweenRows);

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
  // TODO: Pass a % of the available canvas height instead of using rowIndex
  // and numOfRows.
  rowIndex,
  numOfRows,
  curve,
  curveStrength,
}) => {
  const horizontalRatio = sampleIndex / samplesPerRow;
  const verticalRatio = rowIndex / numOfRows;

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
  omegaRadiusSubtractAmount = 90,
  polarTanRatio = 0,
  polarTanMultiplier = 0,
}) => {
  // Normalize the value from 0π to 2π, and then add 0.5π.
  // The added 0.5π is so that the slopes point upwards, instead of to the left.
  // It's effectively a way to rotate by 90deg.
  const theta =
    normalize(sampleIndex, 0, samplesPerRow - 1, 0, 2 * Math.PI) +
    Math.PI * 0.5;

  const radius = mix(
    omegaRadiusSubtractAmount - point[1],
    point[1],
    omegaRatio
  );

  const polarPoint = [theta, radius];

  let [x, y] = convertPolarToCartesian(polarPoint);

  // `polarTanRatio` and `polarTanMultiplier` use Math.tan instead of Math.sin
  // for calculating the polar-to-cartesian values for Y. This creates a
  // "Split universe" effect where lines divide the left and right halves.
  const splitUniverseY = radius * Math.tan(theta) * polarTanMultiplier;

  y = mix(splitUniverseY, y, polarTanRatio);

  const centeredPolarPoint = [x + width / 2, y + height / 2];

  return centeredPolarPoint;
};
