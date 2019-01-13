// @flow
import React from 'react';
import { Spring } from 'react-spring';

import { COLORS } from '../../../constants';
import { getValuesForBezierCurve } from '../../../helpers/line.helpers';

import Svg from '../../Svg';
import OmegaVisualizationPath from './OmegaVisualizationPath';

type Props = {
  size: number,
  value: number,
  isAnimated: boolean,
};

const offsetCurves = [
  { startPoint: [0, 0], endPoint: [1, 1], controlPoint1: [0, -1.25] },
  { startPoint: [0, 0], endPoint: [1, 1], controlPoint1: [0, -0.5] },
  { startPoint: [0, 0], endPoint: [1, 1], controlPoint1: [0, 0] },
  { startPoint: [0, 0], endPoint: [1, 1], controlPoint1: [0, 0.5] },
  { startPoint: [0, 0], endPoint: [1, 1], controlPoint1: [0, 1.25] },
];

const springConfig = {
  tension: 120,
  friction: 7,
};

/**
 * COMPONENT
 */
const OmegaVisualization = ({ size, value, isAnimated }: Props) => {
  const baseMixValue = value / 100;

  const pathColors = [
    COLORS.yellow[500],
    COLORS.aqua[300],
    COLORS.green[300],
    COLORS.yellow[300],
    COLORS.aqua[300],
  ];

  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      {pathColors.map((color, i) => (
        <Spring
          key={i}
          to={{ mix: getValueOnCurve(baseMixValue, offsetCurves[i]) }}
          immediate={!isAnimated}
          config={springConfig}
        >
          {interpolated => (
            <OmegaVisualizationPath color={color} mix={interpolated.mix} />
          )}
        </Spring>
      ))}
    </Svg>
  );
};

/**
 * HELPERS
 */
const getValueOnCurve = (value, curve) => {
  const [, curvedValue] = getValuesForBezierCurve(curve, value);

  return curvedValue;
};

// $FlowFixMe
export default React.memo(OmegaVisualization);
