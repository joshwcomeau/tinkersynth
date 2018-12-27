// @flow

// The user can tweak "high-level" params like perspective, spikyness, etc.
// These values are not used directly in the generator.
// This file specifies the mapping from high-level params to actual variables
// used in the logic.
// `value` will always be from 0-1000
import { normalize } from '../../utils';
import { getValuesForBezierCurve } from '../../helpers/line.helpers';

type InputParameters = {
  height: number,
  perspective: number,
  spikyness: number,
  polarAmount: number,
  omega: number,
  splitUniverse: number,
  enableOcclusion: boolean,
  enableLineBoost: boolean,
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
}: InputParameters) => {
  // For distanceBetweenRows and rowHeightMultiplier, we want to scale the
  // values on a curve, because the values from 0 to 5 are _much_ more
  // interesting than the values from 95 to 100.
  //
  // To do this, we need to normalize our values to 0-1, and then use a bezier
  // curve to map the values onto.
  const bezierCurve = {
    startPoint: [0, 0],
    endPoint: [1, 1],
    controlPoint1: [1, 0],
  };

  const [, perspectiveCurved] = getValuesForBezierCurve(
    bezierCurve,
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

  let numOfRows = 35;
  if (enableLineBoost) {
    numOfRows = numOfRows * 2 - 1;
    // rowHeight /= 2;÷
    distanceBetweenRows /= 2;
  }

  // Wavelength -> perlinRangePerRow & peak height
  const perlinRangePerRow = normalize(wavelength, 0, 100, 0.5, 16);

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
  const [, peaksCurveStrength] = getValuesForBezierCurve(
    {
      startPoint: [1, 0],
      endPoint: [1, 1],
      controlPoint1: [0, 0],
    },
    normalize(personInflateAmount, 0, 100, 5, 0)
  );

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
    // Some fields are just passed right through, no macros:
    enableOcclusion,
    peaksCurve,
  };
};

export default transformParameters;
