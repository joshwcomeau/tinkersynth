import { mixPoints } from '../../helpers/line.helpers';
import { normalize, range, flatten, mix } from '../../utils';
import createNoiseGenerator from '../../vendor/noise';

import {
  occludeLineIfNecessary,
  getPossiblyOccludingRowIndices,
  getDampingAmountForSlopes,
  plotAsPolarCoordinate,
} from './Slopes.helpers';

const seed = Math.random();
const { perlin2 } = createNoiseGenerator(5);

// This flag allows us to log out how long each cycle takes, to compare perf
// of multiple approaches.
const DEBUG_PERF = false;

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
}) => {
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
        polarRatio
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
        horizontalMargin,
        perlinRatio,
        polarRatio,
        polarTanRatio,
        polarTanMultiplier,
        omegaRatio,
        omegaRadiusSubtractAmount,
        peaksCurve,
        peaksCurveStrength,
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
        horizontalMargin,
        perlinRatio,
        polarRatio,
        polarTanRatio,
        polarTanMultiplier,
        omegaRatio,
        omegaRadiusSubtractAmount,
        peaksCurve,
        peaksCurveStrength,
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
  polarRatio
) => {
  // TODO: variable?
  const POLAR_HOLE = 30;

  const cartesianValue =
    height - verticalMargin * 2 - rowIndex * distanceBetweenRows;

  const polarValue = POLAR_HOLE + rowIndex * distanceBetweenRows;

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
  perlinRatio,
  polarRatio,
  polarTanRatio,
  polarTanMultiplier,
  omegaRatio,
  omegaRadiusSubtractAmount,
  enableOcclusion,
  peaksCurve,
  peaksCurveStrength,
  rowSimilarity = 1.5,
}) => {
  // The avg. number of peaks per row depends on the `samplesPerRow`.
  // That value, though, is really just "print resolution", and we shouldn't
  // be changing it for cosmetic effect (unless we want to do a low-poly one or
  // something).
  // Our `PERLIN_MULTIPLIER` value ensures that we can tweak `samplesPerRow`
  // without chaging the appearance of the design, only the # of dots that the
  // plotter has to worry about.
  // TODO: Make this a prop!
  const PERLIN_RANGE_PER_ROW = 10;

  // Perlin noise is a range of values. We need to find the value at this
  // particular point in the range.
  // Our sampleIndex ranges from, say, 0 to 500. We need to normalize that to
  // fit in with our perlin scale.
  const perlinIndex = normalize(
    sampleIndex,
    0,
    samplesPerRow,
    0,
    PERLIN_RANGE_PER_ROW
  );

  // We mix between two possible values: our normal slopy value, and a random
  // noise value.
  const perlinValue = perlin2(perlinIndex, (rowIndex / numOfRows) * 15);
  const rnd = (Math.random() - 0.5) * 0.5;

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
