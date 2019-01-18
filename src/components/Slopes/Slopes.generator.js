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
} from './Slopes.helpers';

// This flag allows us to log out how long each cycle takes, to compare perf
// of multiple approaches.
const DEBUG_PERF = true;
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
 * MAIN SKETCH METHOD
 *
 *
 *
 *
 */
const sketch = ({
  width,
  height,
  margins,
  distanceBetweenRows,
  perlinRatio,
  staticRatio,
  rowHeight,
  polarRatio,
  polarTanRatio,
  polarTanMultiplier,
  omegaRatio,
  omegaRadiusSubtractAmount,
  enableOcclusion,
  numOfRows,
  samplesPerRow,
  peaksCurve,
  peaksCurveStrength,
  perlinRangePerRow,
  amplitudeRatio,
  selfSimilarity,
  polarHoleSize,
  numOfOctaves = 1,
  seed,
}) => {
  const [verticalMargin, horizontalMargin] = margins;

  const distanceBetweenSamples = (width - horizontalMargin * 2) / samplesPerRow;

  const sampleData = {
    width,
    height,
    samplesPerRow,
    distanceBetweenSamples,
    numOfRows,
    rowHeight,
    perlinRangePerRow,
    staticRatio,
    horizontalMargin,
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

  let lines = [];

  // Precompute all row offsets
  const rowOffsets = range(numOfRows).map(rowIndex => {
    return getRowOffset(
      rowIndex,
      width,
      height,
      verticalMargin,
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
    rowOffsets
  );

  // Generate some data!
  range(numOfUsableRows).forEach(function iterateRows(rowIndex) {
    let row = [];

    const previousRowIndices = getPossiblyOccludingRowIndices({
      rowIndex,
      rowHeight,
      amplitudeRatio,
      distanceBetweenRows,
    });

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

      const usePreviousCalculatedPoint =
        perlinRatio === 1 && sampleIndex >= 2 && row[row.length - 1];

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

      const previousLines = previousRowIndices
        .map(function mapPreviousLines(previousRowIndex) {
          return lines[previousRowIndex]
            ? lines[previousRowIndex][sampleIndex - 1]
            : null;
        })
        .filter(line => !!line);

      if (enableOcclusion) {
        line = occludeLineIfNecessary(
          line,
          previousLines,
          width,
          height,
          polarRatio
        );
      }

      row.push(line);
    });

    lines.push(row);
  });

  lines = flatten(lines).filter(line => !!line);

  if (DEBUG_PERF) {
    if (RECORDED_TIMES.length > 40) {
      RECORDED_TIMES.shift();
    }
    RECORDED_TIMES.push(performance.now() - start);
    const sum = values => values.reduce((sum, value) => sum + value, 0);
    const mean = values => sum(values) / values.length;

    console.info(mean(RECORDED_TIMES));
  }

  return lines;
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
  verticalMargin,
  distanceBetweenRows,
  polarRatio,
  polarHoleSize
) => {
  const cartesianValue =
    height - verticalMargin * 2 - rowIndex * distanceBetweenRows;

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
    horizontalMargin,
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
    Math.tan((sampleIndex / samplesPerRow) * Math.PI * 2) * rowOffset;

  const cartesianPoint = [
    sampleIndex * distanceBetweenSamples + horizontalMargin,

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

export default sketch;
