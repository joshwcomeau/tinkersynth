// @flow

// The user can tweak "high-level" params like perspective, spikyness, etc.
// These values are not used directly in the generator.
// This file specifies the mapping from high-level params to actual variables
// used in the logic.
// `value` will always be from 0-1000
import { MIN_NUM_ROWS, MAX_NUM_ROWS } from '../../constants';
import { normalize, mix, clamp } from '../../utils';
import { getValuesForBezierCurve } from '../../helpers/line.helpers';

import type { Curve } from '../../types';

type InputParameters = {
  width: number,
  height: number,
  seed: number,
  swatchId: string,
  amplitudeAmount: number,
  perspective: number,
  lineAmount: number,
  spikyness: number,
  staticAmount: number,
  polarAmount: number,
  omega: number,
  splitUniverse: number,
  enableOcclusion: boolean,
  peaksCurve: Curve,
  peaksCurveAmount: number,
  wavelength: number,
  octaveAmount: number,
  waterBoilAmount: number,
  ballSize: number,
  dotAmount: number,
  lineThicknessAmount: number,
  resolution: number,
  enableMirrored: boolean,
};

const transformParameters = ({
  width,
  height,
  seed,
  swatchId,
  amplitudeAmount,
  wavelength,
  octaveAmount,
  perspective,
  lineAmount,
  spikyness,
  staticAmount,
  polarAmount,
  omega,
  splitUniverse,
  enableOcclusion,
  peaksCurve,
  peaksCurveAmount,
  waterBoilAmount,
  ballSize,
  dotAmount,
  lineThicknessAmount,
  resolution,
  enableMirrored,
}: InputParameters) => {
  // For certain control parameters, we want to scale the
  // values on a curve, because the values from 0 to 5 are _much_ more
  // interesting than the values from 95 to 100.
  //
  // To do this, we need to normalize our values to 0-1, and then use a bezier
  // curve to map the values onto.
  const sharpRisingCurve = {
    startPoint: [0, 0],
    endPoint: [1, 1],
    controlPoint1: [1, 0],
  };

  const [, perspectiveCurved] = getValuesForBezierCurve(
    sharpRisingCurve,
    perspective / 100
  );

  let distanceBetweenRows = normalize(perspectiveCurved, 0, 1, 0, height * 0.1);
  if (perspective < 0) {
    distanceBetweenRows *= -1;
  }

  const rowHeightMultiplier = normalize(perspectiveCurved, 0, 1, 0.05, 0.25);

  let rowHeight = 50 + height * rowHeightMultiplier;

  const perlinRatio = (100 - spikyness) / 100;

  const staticRatio = staticAmount / 100;

  const polarRatio = polarAmount / 100;

  const polarTanRatio = splitUniverse / 100;
  // TODO: experiment with making this a different value
  const polarTanMultiplier = polarTanRatio;

  const omegaRadiusSubtractAmount = rowHeight;
  const omegaRatio = omega / 100;

  let selfSimilarity = normalize(waterBoilAmount, 0, 100, 0, 30);

  const numOfRows = Math.round(
    normalize(lineAmount, 0, 100, MIN_NUM_ROWS, MAX_NUM_ROWS)
  );

  // Wavelength -> perlinRangePerRow & peak height
  const MAX_PERLIN_RANGE_CARTESIAN = 8;
  const MAX_PERLIN_RANGE_POLAR = 16;

  const maxPerlin = mix(
    MAX_PERLIN_RANGE_POLAR,
    MAX_PERLIN_RANGE_CARTESIAN,
    polarRatio
  );

  const perlinRangePerRow = normalize(wavelength, 0, 100, 0.5, maxPerlin);

  // TODO: kill this
  // const amplitude = 1 - (perlinRangePerRow / MAX_PERLIN_RANGE) * 0.4;

  // Our amplitudeRatio is a number from 0 to 3, since it can cause the peaks
  // to be up to 3x taller than they'd otherwise be.
  const amplitudeRatio = (amplitudeAmount / 100) * 3;

  // Transform our `peaksCurveAmount` to control how wide the effect of the
  // peaks curve is.
  //
  // HACK: So, `peaksCurveStrength` is used as an exponent,
  // `value ** peaksCurveStrength`. Because of that, having a linear scale
  // for this value produces an exponential result:
  //
  // peaksCurveStrength     equation      result
  // 1                      5 ** 1        5
  // 2                      5 ** 2        25
  // 3                      5 ** 3        125
  //
  // I want it to appear mostly linear, though, so I'm going to plot that
  // input value on a curve. To offset this.
  //
  // Clearly a better solution would be to not use an exponent, and just scale
  // this as I need... but whenever I try that i get wacky results, which
  // makes me think I'm misunderstanding something... but anyway, it works?
  let [, peaksCurveStrength] = getValuesForBezierCurve(
    {
      startPoint: [1, 0],
      endPoint: [1, 1],
      controlPoint1: [0, 0],
    },
    normalize(peaksCurveAmount, 0, 100, 5, 0)
  );

  const polarHoleSize = normalize(ballSize, 0, 100, 5, 150);

  const numOfOctaves = normalize(octaveAmount, 0, 100, 1, 5);

  // dotAmount -> dotRatio
  const dotRatio = dotAmount / 100;

  // Line thickness controls the width in px of the line.
  // Parameter range is from 0px to 10px
  const lineThickness = lineThicknessAmount / 10;

  let [, baseSamplesPerRow] = getValuesForBezierCurve(
    sharpRisingCurve,
    resolution / 100
  );

  baseSamplesPerRow = normalize(baseSamplesPerRow, 0, 1, 3, width * 2);

  return {
    distanceBetweenRows,
    perlinRatio,
    staticRatio,
    rowHeight,
    polarRatio,
    polarTanRatio,
    polarTanMultiplier,
    numOfRows,
    numOfOctaves,
    omegaRatio,
    peaksCurveStrength,
    perlinRangePerRow,
    omegaRadiusSubtractAmount,
    amplitudeRatio,
    polarHoleSize,
    dotRatio,
    lineThickness,
    baseSamplesPerRow,
    // Some fields are just passed right through:
    enableOcclusion,
    peaksCurve,
    selfSimilarity,
    seed,
    swatchId,
    enableMirrored,
  };
};

export default transformParameters;
