import { groupPolylines } from '../../helpers/line.helpers';
import { normalize, range, mix } from '../../utils';
import createNoiseGenerator from '../../vendor/noise';

import {
  occludeLineIfNecessary,
  getPossiblyOccludingRowIndices,
  getDampingAmountForSlopes,
  getPolarValues,
} from './Slopes.helpers';

const seed = 5; // Math.random()
const { perlin2 } = createNoiseGenerator(seed);

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
const DEFAULT_NUM_OF_ROWS = 10;

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
  distanceBetweenSamples,
  rowOffset,
  rowHeight,
  horizontalMargin,
  peakAmplitudeMultiplier,
}) => [
  sampleIndex * distanceBetweenSamples + horizontalMargin,
  normalize(
    value,
    -1,
    1,
    -rowHeight * peakAmplitudeMultiplier,
    rowHeight * peakAmplitudeMultiplier
  ) + rowOffset,
];

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
    case 0:
    case 1:
      damping = 0.05;
      break;
    case 2:
    case 3:
      damping = 0.1;
      break;
    case 4:
    case 5:
      damping = 0.25;
      break;
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
  samplesPerRow = 250,
  polarRatio,
}) => {
  const [verticalMargin, horizontalMargin] = margins;

  // TODO: Make this a prop
  const numOfRows = DEFAULT_NUM_OF_ROWS;

  let lines = [];

  let peakAmplitudeMultiplier;
  let rowAmplifications = [];

  // Generate some data!
  range(numOfRows).forEach(rowIndex => {
    let row = [];

    // TODO: Randomize this per row. Seed it somehow.
    peakAmplitudeMultiplier = 1;

    rowAmplifications.push(peakAmplitudeMultiplier);

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
        sampleIndex,
        value,
        distanceBetweenSamples,
        rowHeight,
        rowOffset,
        horizontalMargin,
        peakAmplitudeMultiplier,
      });

      const previousValue = getValueAtPoint(
        sampleIndex - 1,
        rowIndex,
        samplesPerRow,
        perlinRatio
      );
      const previousSamplePoint = getSampleCoordinates({
        sampleIndex: sampleIndex - 1,
        value: previousValue,
        distanceBetweenSamples,
        rowHeight,
        rowOffset,
        horizontalMargin,
        peakAmplitudeMultiplier,
      });

      let line = [previousSamplePoint, samplePoint];

      let outputLine = line;

      if (polarRatio > 0) {
        outputLine = getPolarValues({
          line,
          width,
          height,
          sampleIndex,
          samplesPerRow,
          rowHeight,
          polarRatio,
        });
      }

      // OCCLUSION.
      // For doing occlusion, we need to examine the same segment in previous
      // rows. There are multiple ways to do this.
      // My initial "naive" way was to simply recalculate the values for the
      // segments on previous rows. That originally didn't take the cartesian/
      // polar split into account (since it uses `getValueAtPoint`, which is
      // purely cartesian.
      //
      // It turns out this mistake produces interesting effects, however, so
      // I'd like to keep that as an option
      //
      // TODO: Is this really that interesting? If I can roll up the polar
      // coordinate stuff into `getValueAtPoint`, code gets simpler, and maybe
      // it's not sacrificing much. Plus, the recomputing method is slower!
      const USE_CARTESIAN_VALUES_FOR_OCCLUSION = false;

      let previousLines;
      if (USE_CARTESIAN_VALUES_FOR_OCCLUSION) {
        previousLines = previousRowIndices.map(previousRowIndex => {
          const previousRowOffset = getRowOffset(
            previousRowIndex,
            width,
            height,
            verticalMargin,
            distanceBetweenRows,
            polarRatio
          );

          return [
            getSampleCoordinates({
              value: getValueAtPoint(
                sampleIndex - 1,
                previousRowIndex,
                samplesPerRow,
                perlinRatio
              ),
              sampleIndex: sampleIndex - 1,
              distanceBetweenSamples,
              rowHeight,
              rowOffset: previousRowOffset,
              horizontalMargin,
              peakAmplitudeMultiplier: rowAmplifications[previousRowIndex],
            }),
            getSampleCoordinates({
              value: getValueAtPoint(
                sampleIndex,
                previousRowIndex,
                samplesPerRow,
                perlinRatio
              ),
              sampleIndex: sampleIndex,
              distanceBetweenSamples,
              rowHeight,
              rowOffset: previousRowOffset,
              horizontalMargin,
              peakAmplitudeMultiplier: rowAmplifications[previousRowIndex],
            }),
          ];
        });
      } else {
        previousLines = previousRowIndices
          .map(previousRowIndex =>
            lines[previousRowIndex]
              ? lines[previousRowIndex][sampleIndex - 1]
              : null
          )
          .filter(line => !!line);
      }

      outputLine = occludeLineIfNecessary(outputLine, previousLines);

      row.push(outputLine);
    });

    lines.push(row);
  });

  lines = lines.flat().filter(line => !!line);

  lines = groupPolylines(lines);

  return lines;
};

export default sketch;
