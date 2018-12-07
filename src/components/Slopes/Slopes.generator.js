//
import {
  clipLinesWithMargin,
  groupPolylines,
  getValuesForBezierCurve,
} from '../../helpers/line.helpers';
import { normalize, range, compose } from '../../utils';
import { seed, perlin2 } from '../../vendor/noise';

import { occludeLineIfNecessary } from './Slopes.helpers';

seed(20);

/**
 *
 * STATIC SETTINGS
 *
 */
const MARGIN = 1;

// TODO: When this number drops below 300, the occlusion starts to fail a bit,
// you can see lines cutting into other curves :thinking-face:.
// I should fix this, since I should only need 250 samples per row for smooth
// curves, and a lower # will mean much faster rendering.
const SAMPLES_PER_ROW = 250;
const DISTANCE_BETWEEN_ROWS = 0.25;
const NUM_ROWS = 30;

// The avg. number of peaks per row depends on the `SAMPLES_PER_ROW`.
// That value, though, is really just "print resolution", and we shouldn't
// be changing it for cosmetic effect (unless we want to do a low-poly one or
// something).
// Our `PERLIN_MULTIPLIER` value ensures that we can tweak `SAMPLES_PER_ROW`
// without chaging the appearance of the design, only the # of dots that the
// plotter has to worry about.
const PERLIN_RANGE_PER_ROW = 10;

const PEAK_AMPLITUDE_MULTIPLIER = 0.35;

/**
 *
 * UTILITY / HELPER METHODS
 *
 */
const getRowOffset = (
  rowIndex,
  pageHeight,
  distanceBetweenRows = DISTANCE_BETWEEN_ROWS
) => pageHeight - MARGIN * 2 - rowIndex * distanceBetweenRows;

const getSampleCoordinates = ({
  value,
  sampleIndex,
  distanceBetweenSamples,
  rowOffset,
  rowHeight,
}) => [
  sampleIndex * distanceBetweenSamples + MARGIN,
  normalize(
    value,
    -1,
    1,
    -rowHeight * PEAK_AMPLITUDE_MULTIPLIER,
    rowHeight * PEAK_AMPLITUDE_MULTIPLIER
  ) + rowOffset,
];

const getValueAtPoint = (sampleIndex, rowIndex) => {
  // Calculate the noise value for this point in space.
  // We need to do linear interpolation, because while we might have 50 or
  // 500 or 5000 samples per row, we only want to use a standard perlin range
  // of 0 to PERLIN_RANGE_PER_ROW.
  const noiseX = normalize(
    sampleIndex,
    0,
    SAMPLES_PER_ROW,
    0,
    PERLIN_RANGE_PER_ROW
  );

  let noiseVal = perlin2(noiseX, rowIndex * 1.5);

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

  const ratio = sampleIndex / SAMPLES_PER_ROW;
  const isInFirstHalf = ratio < 0.5;

  let bezierArgs = {};
  if (isInFirstHalf) {
    bezierArgs = {
      startPoint: [0, 0],
      controlPoint1: [0.15, 0.05],
      controlPoint2: [1, -0.1],
      endPoint: [1, 1],
      t: ratio * 2,
    };
  } else {
    bezierArgs = {
      startPoint: [0, 1],
      controlPoint1: [0, -0.1],
      controlPoint2: [0.85, 0.05],
      endPoint: [1, 0],
      t: normalize(ratio, 0.5, 1),
    };
  }

  const [, heightDampingAmount] = getValuesForBezierCurve(bezierArgs);

  return noiseVal * heightDampingAmount;
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
export default ({ width, height }) => {
  const ROW_HEIGHT = height * 0.5;

  let lines = [];

  // Generate some data!
  range(NUM_ROWS).forEach(rowIndex => {
    let row = [];

    range(SAMPLES_PER_ROW).forEach(sampleIndex => {
      const value = getValueAtPoint(sampleIndex, rowIndex);

      const rowOffset = getRowOffset(rowIndex, height);
      const distanceBetweenSamples = (width - MARGIN * 2) / SAMPLES_PER_ROW;

      if (sampleIndex === 0) {
        return;
      }

      let samplePoint = getSampleCoordinates({
        sampleIndex,
        value,
        distanceBetweenSamples,
        rowOffset,
        rowHeight: ROW_HEIGHT,
      });

      const previousValue = getValueAtPoint(sampleIndex - 1, rowIndex);
      const previousSamplePoint = getSampleCoordinates({
        sampleIndex: sampleIndex - 1,
        value: previousValue,
        distanceBetweenSamples,
        rowOffset,
        rowHeight: ROW_HEIGHT,
      });

      let line = [previousSamplePoint, samplePoint];

      // Take the 3 most recent rows into account
      const previousRowIndices = [
        rowIndex - 1,
        rowIndex - 2,
        rowIndex - 3,
        rowIndex - 4,
        rowIndex - 5,
        rowIndex - 6,
      ].filter(index => index >= 0);

      const previousLines = previousRowIndices.map(previousRowIndex => {
        const previousRowOffset = getRowOffset(previousRowIndex, height);

        return [
          getSampleCoordinates({
            value: getValueAtPoint(sampleIndex - 1, previousRowIndex),
            sampleIndex: sampleIndex - 1,
            distanceBetweenSamples,
            rowOffset: previousRowOffset,
            rowHeight: ROW_HEIGHT,
          }),
          getSampleCoordinates({
            value: getValueAtPoint(sampleIndex, previousRowIndex),
            sampleIndex: sampleIndex,
            distanceBetweenSamples,
            rowOffset: previousRowOffset,
            rowHeight: ROW_HEIGHT,
          }),
        ];
      });

      const occludedLine = occludeLineIfNecessary(line, previousLines);
      row.push(occludedLine);
    });

    lines.push(...row);
  });

  lines = lines.filter(line => !!line);

  const linePrep = compose(
    groupPolylines,
    clipLinesWithMargin
  );

  lines = linePrep({ lines, margin: MARGIN, width, height });

  return lines;
};
