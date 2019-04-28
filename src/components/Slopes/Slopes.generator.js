import createSeededRandomGenerator from 'random-seed';
import createPerlinGenerator from '../../vendor/noise';

import { mixPoints } from '../../helpers/line.helpers';
import { normalize, range, flatten, mix, clamp } from '../../utils';

import {
  occludeLineIfNecessary,
  getPossiblyOccludingRowIndices,
  getDampingAmountForSlopes,
  plotAsPolarCoordinate,
  getPerlinValueWithOctaves,
  takeStaticIntoAccount,
  getNumOfUsableRows,
  joinLineSegments,
  removeTroublesomeLines,
} from './Slopes.helpers';

// This flag allows us to log out how long each cycle takes, to compare perf
// of multiple approaches.
const DEBUG_PERF = false;
const RECORDED_TIMES = [];

const randomSeed = createSeededRandomGenerator.create();

let cachedPerlinSeed;
let cachedPerlinRatio = null;
let perlinGenerator;

const updateSeed = seed => {
  cachedPerlinSeed = seed;
  let { perlin2 } = createPerlinGenerator(seed);
  perlinGenerator = perlin2;
};

// This API is a bit wonky / backwards, but it works.
// Our noise API will continue to generate new random values until you call
// `initState`, and then it "resets" to the beginning of the sequence of
// pseudo-random values.
//
// Most of the time, when a parameter like `perspective` changes, I want to
// preserve the previous sequence of random values, so that the lines don't
// regenerate.
//
// Critically, each `sketch` call generates the same number of data points, and
// so by initializing to the beginning of the sequence at the start of every
// tick, I ensure the same values will be used.
//
// When the perlin seed changes, or when mutating the "perlinRatio", I want to
// generate new values, so I won't call this method.
const reuseRandomValues = () => {
  randomSeed.initState();
};

/**
 *
 *
 *
 *
 * MAIN GENERATOR METHOD
 *
 *
 *
 *
 */
const generator = ({
  width,
  height,
  distanceBetweenRows,
  perlinRatio,
  staticRatio,
  rowHeight,
  polarRatio,
  polarTanRatio,
  polarTanMultiplier,
  numOfRows,
  numOfOctaves = 1,
  omegaRatio,
  peaksCurveStrength,
  perlinRangePerRow,
  omegaRadiusSubtractAmount,
  amplitudeRatio,
  polarHoleSize,
  dotRatio,
  enableOcclusion,
  peaksCurve,
  selfSimilarity,
  seed,
  baseSamplesPerRow,
  enableMirrored,
}) => {
  // For aesthetic reasons, I don't want the lines to start at the very bottom
  // of the page, in cartesian mode.
  // The amount being offset is currently set to an arbitrary amount, maybe it
  // should become a param?
  const bottomOffset = height / 12;

  // I want `samplesPerRow` to be as high as possible, so that curves aren't
  // choppy and gross. But, the higher it is, the more expensive / slow it is
  // to compute.
  // In standard "cartesian" mode, using width * 0.5 is fine (1 point every 2
  // pixels). In Polar mode, though, a single line does a big loop around the
  // canvas, so we need more than 1 point per width-pixel to represent it.
  const samplesPerRowWidthMultiplier = mix(1, 0.5, polarRatio);

  const samplesPerRow = Math.ceil(
    baseSamplesPerRow * samplesPerRowWidthMultiplier
  );

  const distanceBetweenSamples = width / (samplesPerRow - 1);

  const sampleData = {
    width,
    height,
    samplesPerRow,
    distanceBetweenSamples,
    numOfRows,
    rowHeight,
    perlinRangePerRow,
    staticRatio,
    perlinRatio,
    polarRatio,
    polarTanRatio,
    polarTanMultiplier,
    omegaRatio,
    omegaRadiusSubtractAmount,
    peaksCurve,
    peaksCurveStrength,
    amplitudeRatio,
    selfSimilarity,
    numOfOctaves,
  };
  const hasSeedChanged = seed !== cachedPerlinSeed;

  // Keep the same random values around unless we're
  if (!hasSeedChanged && perlinRatio === cachedPerlinRatio) {
    reuseRandomValues();
  } else {
    // We need to retain a memory of the previous cachedPerlinRatio, since we
    // decide whether or not to reuse the noise values based on if it's changed.
    cachedPerlinRatio = perlinRatio;
  }

  if (hasSeedChanged) {
    updateSeed(seed);
  }

  let start;
  if (DEBUG_PERF) {
    start = performance.now();
  }

  let rows = [];

  // Precompute all row offsets
  const rowOffsets = range(numOfRows).map(rowIndex => {
    return getRowOffset(
      rowIndex,
      width,
      height,
      bottomOffset,
      distanceBetweenRows,
      polarRatio,
      polarHoleSize
    );
  });

  const numOfUsableRows = getNumOfUsableRows(
    width,
    height,
    numOfRows,
    polarRatio,
    polarTanRatio,
    omegaRatio,
    rowOffsets
  );

  // Generate some data!
  range(numOfUsableRows).forEach(function iterateRows(rowIndex) {
    let row = [];

    range(samplesPerRow).forEach(function iterateSamples(sampleIndex) {
      if (sampleIndex === 0) {
        return;
      }

      const rowOffset = rowOffsets[rowIndex];

      // NOTE FOR FUTURE ME:
      // THe issue is that the occlusion happens after `getSampleCoordinate`,
      // but by trying to reuse a previous value, it grabs the non-occluded one?
      // That doesn't really make sense... but hopefully moving to a two-stage
      // system, where first I calculate all the raw line values, and THEN I
      // calculate the occlusions, will fix it.
      //
      // The next, totally different problem is around not passing a huge data
      // structure to be drawn on canvas. See notes in the benchmark.md

      const usePreviousCalculatedPoint = perlinRatio === 1 && sampleIndex >= 2;

      let samplePoint = getSampleCoordinates(
        rowIndex,
        rowOffset,
        sampleIndex,
        sampleData
      );

      const previousSamplePoint = usePreviousCalculatedPoint
        ? row[row.length - 1][1]
        : getSampleCoordinates(
            rowIndex,
            rowOffset,
            sampleIndex - 1,
            sampleData
          );

      let line = [previousSamplePoint, samplePoint];

      row.push(line);
    });

    rows.push(row);
  });

  if (enableOcclusion) {
    const newLines = rows.map((row, rowIndex) => {
      const previousRowIndices = getPossiblyOccludingRowIndices({
        rowIndex,
        rowHeight,
        amplitudeRatio,
        distanceBetweenRows,
      });

      return row.map((line, sampleIndex) => {
        const previousLines = previousRowIndices
          .map(function mapPreviousLines(previousRowIndex) {
            return rows[previousRowIndex]
              ? rows[previousRowIndex][sampleIndex]
              : null;
          })
          .filter(line => !!line);

        return occludeLineIfNecessary(
          line,
          previousLines,
          width,
          height,
          polarRatio
        );
      });
    });

    rows = newLines;
  }

  if (dotRatio !== 0) {
    // In addition to trimming the lines into dots, we also want to increase
    // the spacing between the dots. This is so that it's clearer what's
    // happening (the dots are often too close together to tell)
    const shiftedDotRatio = clamp(normalize(dotRatio, 0, 0.5, 0.5, 0), 0.01, 1);

    rows.forEach(row => {
      row.forEach(line => {
        if (!line) {
          return;
        }
        const [p1, p2] = line;

        const deltaX = p2[0] - p1[0];
        const deltaY = p2[1] - p1[1];

        line[1] = [
          p1[0] + deltaX * (1 - dotRatio),
          p1[1] + deltaY * (1 - dotRatio),
        ];
      });
    });
  }

  if (enableMirrored) {
    rows.forEach((row, rowIndex) => {
      const mirroredRow = [];

      row.forEach((line, lineIndex) => {
        if (!line) {
          return;
        }

        const halfwayPoint = height / 2;

        // If both points are above the halfway point, we don't need to render
        // this line at all.
        if (line[0][1] > halfwayPoint && line[1][1] > halfwayPoint) {
          rows[rowIndex][lineIndex] = null;
          return;
        }

        // If only 1 of the 2 points is above, we need to do some maths, to work
        // out where the intersection with the halfway point is, and truncate
        // the line there.
        if (line[1][1] > halfwayPoint) {
          const deltaX = line[1][0] - line[0][0];
          const deltaY = line[1][1] - line[0][1];
          const deltaYHalfway = halfwayPoint - line[0][1];
          const ratio = deltaYHalfway / deltaY;

          line[1] = [line[1][0] + deltaX * ratio, halfwayPoint];
        }

        if (line[0][1] > halfwayPoint) {
          const deltaX = line[1][0] - line[0][0];
          const deltaY = line[1][1] - line[0][1];
          const deltaYHalfway = halfwayPoint - line[0][1];
          const ratio = deltaYHalfway / deltaY;

          line[0] = [line[0][0] + deltaX * ratio, halfwayPoint];
        }

        const flippedLine = line.map(point => {
          return [point[0], height - point[1]];
        });

        mirroredRow.push(flippedLine);
      });

      rows.push(mirroredRow);
    });
  }

  // At this point, `rows` is an array of rows, and every row is an array of
  // line segments. Every line segment is an array of two points, pseudo-tuple.
  // This is a LOT of arrays, so here's an example:
  /*

  rows === [
    // Row 1
    [
      // Line segment 1
      [
        // Point 1
        [120, 200],
        // Point 2
        [121, 199],
      ],
      // Sometimes, line segments are `null`, if this segment was occluded
      null,
    ]
  ]
  */

  // Filter out all occluded-away line segments
  rows = rows.map(row => row.filter(line => !!line));

  // If it's safe to do so, we should create polylines instead of having many
  // many 2-point line segments.
  // This saves a ton of time when it comes to actually drawing the rows:
  // With standard settings, it goes from 30-40ms drawing time to 5-6ms.
  //
  // (Note that this is not captured in the DEBUG_PERF here, since it affects
  // the paint-to-canvas time, not the calculate-rows time.)
  //
  // The data-munging cost of the `joinLineSegments` call is <1ms,
  // so this is a huge win :D
  //
  // I take perlinRatio (spikyness) into account because spikes should not
  // be joined. Also, polarTanRatio (split universe) is not safe to join (it
  // creates a bunch of weird additional lines).
  const isMostlyContiguous = perlinRatio === 1;
  if (isMostlyContiguous) {
    rows = rows.map(joinLineSegments);
  }

  // `polarTanRatio` can create rows with values far outside the canvas.
  // This would normally be fine, except then their rendering is really
  // unpredictable - the rows change depending on the window size, for example.
  // We should remove any "troublesome" line, to make rendering consistent.
  const requiresTrimming = polarTanRatio > 0;

  if (requiresTrimming) {
    rows = rows.map(row => removeTroublesomeLines(width, height, row));
  }

  if (DEBUG_PERF) {
    if (RECORDED_TIMES.length > 40) {
      RECORDED_TIMES.shift();
    }
    RECORDED_TIMES.push(performance.now() - start);
    const sum = values => values.reduce((sum, value) => sum + value, 0);
    const mean = values => sum(values) / values.length;

    console.info(mean(RECORDED_TIMES));
  }

  return rows;
};

/**
 *
 * UTILITY / HELPER METHODS
 *
 */
const getRowOffset = (
  rowIndex,
  width,
  height,
  bottomOffset,
  distanceBetweenRows,
  polarRatio,
  polarHoleSize
) => {
  const cartesianValue =
    height - bottomOffset * 2 - rowIndex * distanceBetweenRows;

  const polarValue = polarHoleSize + rowIndex * distanceBetweenRows;

  return mix(polarValue, cartesianValue, polarRatio);
};

const getSampleCoordinates = (
  rowIndex,
  rowOffset,
  sampleIndex,
  {
    width,
    height,
    samplesPerRow,
    distanceBetweenSamples,
    numOfRows,
    rowHeight,
    amplitudeRatio,
    perlinRangePerRow,
    staticRatio,
    perlinRatio,
    polarRatio,
    polarTanRatio,
    polarTanMultiplier,
    omegaRatio,
    omegaRadiusSubtractAmount,
    enableOcclusion,
    peaksCurve,
    peaksCurveStrength,
    selfSimilarity,
    numOfOctaves,
  }
) => {
  // Our standard value is this curvy, swoopy slope thing, à la Joy Division.
  // We use perlin noise for this: the sampleIndex forms the x axis value,
  // while the rowIndex forms the y axis value.
  // In some cases, the y-axis values will be close enough together that it
  // looks cohesive, like a 2D map. Other times, the values are far enough
  // apart that each row appears totally independent. This is controlled by
  // `selfSimilarity`
  const perlinIndex =
    normalize(sampleIndex, 0, samplesPerRow, 0, perlinRangePerRow) +
    perlinRangePerRow;

  const perlinValue = getPerlinValueWithOctaves(
    perlinGenerator,
    perlinIndex,
    (rowIndex / numOfRows) * selfSimilarity,
    amplitudeRatio,
    numOfOctaves
  );

  // Another possible world is where each value is randomized. This creates a
  // busy "noise" effect.
  // Use our amplitude to control how "loud" the noise is. We need to di
  const rndBase = randomSeed.floatBetween(-0.25, 0.25) * amplitudeRatio;

  const rnd = takeStaticIntoAccount(
    staticRatio,
    sampleIndex,
    rowIndex,
    rndBase
  );

  // We mix between two possible values: our normal slopy value, and our random
  // noise value.
  let mixedValue = perlinValue * perlinRatio + rnd * (1 - perlinRatio);

  // Unless explicitly disabled, we want the peak strength to follow a bezier
  // curve. For example, the classic Joy Division cover would have a straight
  // line down the middle where the peaks are strongest.
  const verticalRatio = 1 - rowOffset / height;
  const slopeDampingAmount = getDampingAmountForSlopes({
    sampleIndex,
    samplesPerRow,
    verticalRatio,
    curve: peaksCurve,
    curveStrength: peaksCurveStrength,
  });

  // `value` is a number between -1 and 1, representing how far away from
  // baseline this point is.
  // Our next step is to convert that to cartesian coordinates, and take polar
  // ratio into account.
  let value = mixedValue * slopeDampingAmount;

  const cartesianY = normalize(value, -1, 1, -rowHeight, rowHeight) + rowOffset;

  const tangentY =
    Math.tan((sampleIndex / samplesPerRow) * Math.PI * 2 * polarTanRatio * 2) *
    rowOffset;

  const cartesianPoint = [
    sampleIndex * distanceBetweenSamples,

    mix(tangentY, cartesianY, polarTanRatio),
  ];

  if (polarRatio === 0) {
    return cartesianPoint;
  }

  const polarPoint = plotAsPolarCoordinate({
    point: cartesianPoint,
    width,
    height,
    sampleIndex,
    samplesPerRow,
    omegaRatio,
    omegaRadiusSubtractAmount,
    polarTanRatio,
    polarTanMultiplier,
  });

  return mixPoints(polarPoint, cartesianPoint, polarRatio);
};

export default generator;
