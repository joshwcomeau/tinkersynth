import { groupPolylines } from '../../helpers/line.helpers';
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
 * STATIC SETTINGS
 *
 */

// The avg. number of peaks per row depends on the `samplesPerRow`.
// That value, though, is really just "print resolution", and we shouldn't
// be changing it for cosmetic effect (unless we want to do a low-poly one or
// something).
// Our `PERLIN_MULTIPLIER` value ensures that we can tweak `samplesPerRow`
// without chaging the appearance of the design, only the # of dots that the
// plotter has to worry about.
const PERLIN_RANGE_PER_ROW = 10;

const DEFAULT_SAMPLES_PER_ROW = 250;
const DEFAULT_NUM_OF_ROWS = 3;

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
  const POLAR_HOLE = 50;

  const cartesianValue =
    height - verticalMargin * 2 - rowIndex * distanceBetweenRows;

  const polarValue = POLAR_HOLE + rowIndex * distanceBetweenRows;

  return mix(polarValue, cartesianValue, polarRatio);
};

const getSampleCoordinates = ({
  value,
  sampleIndex,
  width,
  height,
  samplesPerRow,
  distanceBetweenSamples,
  rowOffset,
  rowHeight,
  horizontalMargin,
  polarRatio,
  polarTanRatio,
  polarTanMultiplier,
  omegaRatio,
  omegaRadiusSubtractAmount,
}) => {
  const cartesianPoint = [
    sampleIndex * distanceBetweenSamples + horizontalMargin,
    normalize(value, -1, 1, -rowHeight, rowHeight) + rowOffset,
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

  return [
    mix(polarPoint[0], cartesianPoint[0], polarRatio),
    mix(polarPoint[1], cartesianPoint[1], polarRatio),
  ];
};

const getValueAtPoint = (sampleIndex, rowIndex, samplesPerRow, perlinRatio) => {
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
  const perlinValue = perlin2(perlinIndex, rowIndex * 1.5);
  const rnd = (Math.random() - 0.5) * 0.5;

  let mixedValue = perlinValue * perlinRatio + rnd * (1 - perlinRatio);

  // Different rows have different damping amounts
  let damping;
  switch (rowIndex) {
    // case 0:
    // case 1:
    //   damping = 0.05;
    //   break;
    // case 2:
    // case 3:
    //   damping = 0.1;
    //   break;
    // case 4:
    // case 5:
    //   damping = 0.25;
    //   break;
    default:
      damping = Math.abs(perlin2(rowIndex + 0.1234, rowIndex * 1.5)) + 0.5;
  }
  mixedValue *= damping;

  // To achieve a Joy Division like effect, where the peaks are all in the
  // center, we'll want to apply a damping effect based on the position along
  // the X axis. `slopeDampingAmount` is a multiplier between 0 and 1.

  const slopeDampingAmount = getDampingAmountForSlopes({
    sampleIndex,
    samplesPerRow,
  });

  return mixedValue * slopeDampingAmount;
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
  rowHeight,
  polarRatio,
  polarTanRatio,
  polarTanMultiplier,
  omegaRatio,
  omegaRadiusSubtractAmount,
  numOfRows = DEFAULT_NUM_OF_ROWS,
  samplesPerRow = DEFAULT_SAMPLES_PER_ROW,
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

      const value = getValueAtPoint(
        sampleIndex,
        rowIndex,
        samplesPerRow,
        perlinRatio
      );

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
        value,
        sampleIndex,
        width,
        height,
        samplesPerRow,
        distanceBetweenSamples,
        rowOffset,
        rowHeight,
        horizontalMargin,
        polarRatio,
        polarTanRatio,
        polarTanMultiplier,
        omegaRatio,
        omegaRadiusSubtractAmount,
      });

      const previousValue = getValueAtPoint(
        sampleIndex - 1,
        rowIndex,
        samplesPerRow,
        perlinRatio
      );
      const previousSamplePoint = getSampleCoordinates({
        value: previousValue,
        sampleIndex: sampleIndex - 1,
        width,
        height,
        samplesPerRow,
        distanceBetweenSamples,
        rowOffset,
        rowHeight,
        horizontalMargin,
        polarRatio,
        polarTanRatio,
        polarTanMultiplier,
        omegaRatio,
        omegaRadiusSubtractAmount,
      });

      let line = [previousSamplePoint, samplePoint];

      const previousLines = previousRowIndices
        .map(previousRowIndex =>
          lines[previousRowIndex]
            ? lines[previousRowIndex][sampleIndex - 1]
            : null
        )
        .filter(line => !!line);

      line = occludeLineIfNecessary(
        line,
        previousLines,
        width,
        height,
        polarRatio
      );

      row.push(line);
    });

    lines.push(row);
  });

  lines = flatten(lines).filter(line => !!line);

  lines = groupPolylines(lines);

  if (DEBUG_PERF) {
    console.info(performance.now() - start);
  }

  return lines;
};

export default sketch;
