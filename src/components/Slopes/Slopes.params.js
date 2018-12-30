// @flow

// The user can tweak "high-level" params like perspective, spikyness, etc.
// These values are not used directly in the generator.
// This file specifies the mapping from high-level params to actual variables
// used in the logic.
// `value` will always be from 0-1000
import { normalize, mix } from '../../utils';
import { getValuesForBezierCurve } from '../../helpers/line.helpers';

import type { Bezier } from '../../types';

type InputParameters = {
  height: number,
  perspective: number,
  spikyness: number,
  polarAmount: number,
  omega: number,
  splitUniverse: number,
  enableOcclusion: boolean,
  enableLineBoost: boolean,
  peaksCurve: Bezier,
  personInflateAmount: number,
  wavelength: number,
  waterBoilAmount: number,
  ballSize: number,
};

const transformParameters = ({
  height,
  perspective,
  spikyness,
  polarAmount,
  omega,
  splitUniverse,
  enableOcclusion,
  enableLineBoost,
  peaksCurve,
  personInflateAmount,
  wavelength,
  waterBoilAmount,
  ballSize,
}: InputParameters) => {
  // For distanceBetweenRows and rowHeightMultiplier, we want to scale the
  // values on a curve, because the values from 0 to 5 are _much_ more
  // interesting than the values from 95 to 100.
  //
  // To do this, we need to normalize our values to 0-1, and then use a bezier
  // curve to map the values onto.
  const perspectiveScaleCurve = {
    startPoint: [0, 0],
    endPoint: [1, 1],
    controlPoint1: [1, 0],
  };

  const [, perspectiveCurved] = getValuesForBezierCurve(
    perspectiveScaleCurve,
    perspective / 100
  );

  let distanceBetweenRows = normalize(perspectiveCurved, 0, 1, 0, height * 0.1);
  const rowHeightMultiplier = normalize(perspectiveCurved, 0, 1, 0.05, 0.25);

  let rowHeight = 50 + height * rowHeightMultiplier;

  const perlinRatio = (100 - spikyness) / 100;

  const polarRatio = polarAmount / 100;

  const polarTanRatio = splitUniverse / 100;
  // TODO: experiment with making this a different value
  const polarTanMultiplier = polarTanRatio;

  const omegaRadiusSubtractAmount = rowHeight;
  const omegaRatio = omega / 100;

  let numOfRows = 60;
  if (enableLineBoost) {
    numOfRows = numOfRows * 2 - 1;
    distanceBetweenRows /= 2;
  }

  // Wavelength -> perlinRangePerRow & peak height
  const MAX_PERLIN_RANGE = 16;
  const perlinRangePerRow = normalize(
    wavelength,
    0,
    100,
    0.5,
    MAX_PERLIN_RANGE
  );
  const amplitude = 1 - (perlinRangePerRow / MAX_PERLIN_RANGE) * 0.4;

  // Transform our `personInflateAmount` to control how wide the effect of the
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
    normalize(personInflateAmount, 0, 100, 5, 0)
  );

  // When the wavelength is really low, we want to reduce the strength of the
  // peaks curve. This is because at low wavelength, what should be long smooth
  // slopes develop weird little points.
  // NOTE: Unfortunately, we want to do the opposite thing when the polarRatio
  // is >0, since in circular mode, we want the lines to line up, when the
  // curve is in its default position.
  if (polarRatio < 1) {
    const wavelengthAdjustment = Math.max(wavelength / 100, 0.05);
    peaksCurveStrength *= mix(wavelengthAdjustment, 1, 1 - polarRatio);
  }

  const selfSimilarity = normalize(waterBoilAmount, 0, 100, 0, 30);

  const polarHoleSize = normalize(ballSize, 0, 100, 5, 150);

  return {
    distanceBetweenRows,
    perlinRatio,
    rowHeight,
    polarRatio,
    polarTanRatio,
    polarTanMultiplier,
    numOfRows,
    omegaRatio,
    peaksCurveStrength,
    perlinRangePerRow,
    omegaRadiusSubtractAmount,
    amplitude,
    polarHoleSize,
    // Some fields are just passed right through, no macros:
    enableOcclusion,
    peaksCurve,
    selfSimilarity,
  };
};

export default transformParameters;
