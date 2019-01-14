import { mixPoints } from '../../helpers/line.helpers';
import { normalize, range, flatten, mix, clamp } from '../../utils';
import createNoiseGenerator from '../../vendor/noise';

import {
  occludeLineIfNecessary,
  getPossiblyOccludingRowIndices,
  getDampingAmountForSlopes,
  plotAsPolarCoordinate,
  getPerlinValueWithOctaves,
  takeExplosionsIntoAccount,
} from './Slopes.helpers';

// This flag allows us to log out how long each cycle takes, to compare perf
// of multiple approaches.
const DEBUG_PERF = false;

let cachedSeed;
let noiseGenerator;

const updateSeed = seed => {
  cachedSeed = seed;
  let { perlin2 } = createNoiseGenerator(seed);
  noiseGenerator = perlin2;
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
  explosionRatio,
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
  if (seed !== cachedSeed) {
    updateSeed(seed);
  }

  let start;
  if (DEBUG_PERF) {
    start = performance.now();
  }

  const [verticalMargin, horizontalMargin] = margins;

  let lines = [];

  // Generate some data!
  range(numOfRows).forEach(rowIndex => {
    let row = [];

    const previousRowIndices = getPossiblyOccludingRowIndices({
      rowIndex,
      rowHeight,
      amplitudeRatio,
      distanceBetweenRows,
    });

    // We can set each row to be a radius around a center point, instead of
    // parallel lines :o
    // Our old 'Y' values will now be the 'r', and the sampleIndex will become
    // the degrees.

    range(samplesPerRow).forEach(sampleIndex => {
      if (sampleIndex === 0) {
        return;
      }

      const rowOffset = getRowOffset(
        rowIndex,
        width,
        height,
        verticalMargin,
        distanceBetweenRows,
        polarRatio,
        polarHoleSize
      );

      const distanceBetweenSamples =
        (width - horizontalMargin * 2) / samplesPerRow;

      let samplePoint = getSampleCoordinates({
        sampleIndex,
        rowIndex,
        width,
        height,
        samplesPerRow,
        distanceBetweenSamples,
        numOfRows,
        rowOffset,
        rowHeight,
        perlinRangePerRow,
        explosionRatio,
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
      });

      const previousSamplePoint = getSampleCoordinates({
        sampleIndex: sampleIndex - 1,
        rowIndex,
        width,
        height,
        samplesPerRow,
        distanceBetweenSamples,
        numOfRows,
        rowOffset,
        rowHeight,
        perlinRangePerRow,
        explosionRatio,
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
      });

      let line = [previousSamplePoint, samplePoint];

      const previousLines = previousRowIndices
        .map(previousRowIndex =>
          lines[previousRowIndex]
            ? lines[previousRowIndex][sampleIndex - 1]
            : null
        )
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
    console.info(performance.now() - start);
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

const getSampleCoordinates = ({
  rowIndex,
  sampleIndex,
  width,
  height,
  samplesPerRow,
  distanceBetweenSamples,
  numOfRows,
  rowOffset,
  rowHeight,
  horizontalMargin,
  amplitudeRatio,
  perlinRangePerRow,
  explosionRatio,
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
}) => {
  // Our standard value is this curvy, swoopy slope thing, à la Joy Division.
  // We use perlin noise for this: the sampleIndex forms the x axis value,
  // while the rowIndex forms the y axis value.
  // In some cases, the y-axis values will be close enough together that it
  // looks cohesive, like a 2D map. Other times, the values are far enough
  // apart that each row appears totally independent. This is controlled by
  // `selfSimilarity`
  //
  // TODO: Should I apply the amplitudeRatio to `mixedValue` as well?
  const perlinIndex =
    normalize(sampleIndex, 0, samplesPerRow, 0, perlinRangePerRow) +
    perlinRangePerRow;

  const perlinValue = getPerlinValueWithOctaves(
    noiseGenerator,
    perlinIndex,
    (rowIndex / numOfRows) * selfSimilarity,
    amplitudeRatio,
    numOfOctaves
  );

  // Another possible world is where each value is randomized. This creates a
  // busy "noise" effect.
  // TODO: Make the multiplier based on amplitudeRatio
  const rndBase = (Math.random() - 0.5) * 0.5;

  const rnd = takeExplosionsIntoAccount(
    explosionRatio,
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

  const slopeDampingAmount = getDampingAmountForSlopes({
    sampleIndex,
    samplesPerRow,
    rowIndex,
    numOfRows,
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
