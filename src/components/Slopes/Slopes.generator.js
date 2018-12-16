import {
  groupPolylines,
  clipLinesWithMargin,
} from '../../helpers/line.helpers';
import {
  normalize,
  range,
  compose,
  convertPolarToCartesian,
  mix,
} from '../../utils';
import createNoiseGenerator from '../../vendor/noise';

import {
  occludeLineIfNecessary,
  getPossiblyOccludingRowIndices,
  getDampingAmountForSlopes,
} from './Slopes.helpers';

const { perlin2 } = createNoiseGenerator(Math.random());

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

  const numOfRows = 25;
  // const peakAmplitudeMultiplier = 1;

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

      const previousLines = previousRowIndices.map(previousRowIndex => {
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

      let occludedLine = occludeLineIfNecessary(line, previousLines);

      if (!occludedLine) {
        return;
      }

      let outputLine = occludedLine;

      if (polarRatio > 0) {
        // Get a value for theta going from 0 to 2π
        const theta = normalize(sampleIndex, 0, samplesPerRow, 0, 2 * Math.PI);

        const radius = rowHeight - occludedLine[1][1];

        const previousTheta = normalize(
          sampleIndex - 1,
          0,
          samplesPerRow,
          0,
          2 * Math.PI
        );

        const previousRadius = rowHeight - occludedLine[0][1];

        let polarLine = [
          convertPolarToCartesian([previousRadius, previousTheta]),
          convertPolarToCartesian([radius, theta]),
        ];

        polarLine = polarLine.map(point => [
          point[0] + width / 2,
          point[1] + height / 2,
        ]);

        outputLine[0][0] = mix(polarLine[0][0], occludedLine[0][0], polarRatio);
        outputLine[0][1] = mix(polarLine[0][1], occludedLine[0][1], polarRatio);
        outputLine[1][0] = mix(polarLine[1][0], occludedLine[1][0], polarRatio);
        outputLine[1][1] = mix(polarLine[1][1], occludedLine[1][1], polarRatio);
      }

      row.push(outputLine);
    });

    lines.push(...row);
  });

  lines = lines.filter(line => !!line);

  lines = groupPolylines(lines);

  return lines;
};

export default sketch;
