//
import {
  groupPolylines,
  getValuesForBezierCurve,
  clipLinesWithMargin,
} from '../../helpers/line.helpers';
import {
  normalize,
  range,
  compose,
  convertPolarToCartesian,
  mix,
} from '../../utils';
import { seed, perlin2 } from '../../vendor/noise';

import {
  occludeLineIfNecessary,
  getPossiblyOccludingRowIndices,
} from './Slopes.helpers';

seed(Math.random());

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
  // Calculate the noise value for this point in space.
  // We need to do linear interpolation, because while we might have 50 or
  // 500 or 5000 samples per row, we only want to use a standard perlin range
  // of 0 to PERLIN_RANGE_PER_ROW.
  const noiseX = normalize(
    sampleIndex,
    0,
    samplesPerRow,
    0,
    PERLIN_RANGE_PER_ROW
  );

  const p2 = perlin2(noiseX, rowIndex * 1.5);
  const rnd = (Math.random() - 0.5) * 0.5;

  let noiseVal = p2 * perlinRatio + rnd * (1 - perlinRatio);

  // Different rows have different damping amounts
  const damping = rowIndex % 2 === 0 ? 0.85 : 1;
  noiseVal *= damping;

  // If we were to just return `noiseVal`, we'd have mountains all over the
  // page. Instead, though, we want to dampen the effect of the randomization,
  // so that it starts subtle, peaks in the center, and then drops off at the
  // end. Like a bell curve.
  //
  // My not-the-smartest way to do this is to consider it as 2 bezier curves:
  /*

  For the first half, use a cubic bezier curve to produce a curve that eases
  in and out, to ramp from 0 to 1:
  o         ____o
          /
        |
  _____|
  o             o

  The second half will be the mirror image, starting high and dropping low.
  */

  const ratio = sampleIndex / samplesPerRow;
  const isInFirstHalf = ratio < 0.5;

  let bezierArgs = {};
  if (isInFirstHalf) {
    bezierArgs = {
      startPoint: [0, 0],
      controlPoint1: [1, 0],
      controlPoint2: [1, 1],
      endPoint: [1, 1],
      t: ratio * 2,
    };
  } else {
    bezierArgs = {
      startPoint: [0, 1],
      controlPoint1: [0, 1],
      controlPoint2: [1, 0],
      endPoint: [1, 0],
      t: normalize(ratio, 0.5, 1),
    };
  }

  const [, heightDampingAmount] = getValuesForBezierCurve(bezierArgs);

  // By default, our bezier curve damping has a relatively modest effect.
  // If we want to truly isolate the peaks to the center of the page, we need
  // to raise that effect exponentially.
  // 4 seems to do a good job imitating the harsh curve I was using before.
  const DAMPING_STRENGTH = 4;

  return noiseVal * heightDampingAmount ** DAMPING_STRENGTH;
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

      // If this line is TOTALLY occluded, it will be `null`.
      // We do want to push this onto

      // if (occludedLine) {

      row.push(outputLine);
    });

    lines.push(...row);
  });

  lines = lines.filter(line => !!line);

  // const linePrep = compose(
  //   groupPolylines,
  //   clipLinesWithMargin
  // );

  // lines = linePrep({ lines, margins, width, height });

  return lines;
};

export default sketch;
