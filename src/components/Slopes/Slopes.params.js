// @flow

// The user can tweak "high-level" params like perspective, spikyness, etc.
// These values are not used directly in the generator.
// This file specifies the mapping from high-level params to actual variables
// used in the logic.
// `value` will always be from 0-1000
import { normalize } from '../../utils';
import { getValuesForBezierCurve } from '../../helpers/line.helpers';

type InputParameters = {};

const transformParameters = ({
  height,
  perspective,
  spikyness,
  polarAmount,
  omega,
}) => {
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

  const [, distanceBetweenRowsNormalized] = getValuesForBezierCurve({
    ...bezierCurve,
    t: perspective / 100,
  });
  const distanceBetweenRows = normalize(
    distanceBetweenRowsNormalized,
    0,
    1,
    0,
    height * 0.1
  );

  const [, rowHeightMultiplierNormalized] = getValuesForBezierCurve({
    ...bezierCurve,
    t: perspective / 100,
  });
  const rowHeightMultiplier = normalize(
    rowHeightMultiplierNormalized,
    0,
    1,
    0.05,
    0.25
  );

  const rowHeight = 50 + height * rowHeightMultiplier;

  const perlinRatio = (100 - spikyness) / 100;

  const polarRatio = polarAmount / 100;

  const omegaRatio = omega / 100;
  const omegaRadiusSubtractAmount = rowHeight;

  return {
    distanceBetweenRows,
    perlinRatio,
    rowHeight,
    polarRatio,
    omegaRatio,
    omegaRadiusSubtractAmount,
  };
};

export default transformParameters;
