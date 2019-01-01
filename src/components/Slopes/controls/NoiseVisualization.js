// @flow
import React from 'react';
import { Spring } from 'react-spring';

import { COLORS } from '../../../constants';
import { getValuesForBezierCurve } from '../../../helpers/line.helpers';

import Svg from '../../Svg';

type Props = {
  width: number,
  height: number,
  value: number,
};

const NoiseVisualization = ({ width, height, value }: Props) => {
  const ratio = value / 100;

  const innerWidth = width - 20;
  const innerHeight = height - 40;

  return (
    <Svg width={innerWidth} height={innerHeight}>
      <path
        d={`
          M 0,${innerHeight}
          C ${innerWidth * 0.33},0
            ${innerWidth * 0.66},${innerHeight}
            ${innerWidth},0
        `}
        stroke={COLORS.pink[500]}
        strokeWidth={3}
      />
    </Svg>
  );
};

// $FlowFixMe
export default React.memo(NoiseVisualization);
