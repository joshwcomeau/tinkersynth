// @flow
import React from 'react';
import { Spring } from 'react-spring';

import { COLORS } from '../../../constants';
import { getValuesForBezierCurve } from '../../../helpers/line.helpers';
import { range } from '../../../utils';

import Svg from '../../Svg';

type Props = {
  width: number,
  height: number,
  value: number,
};

const NoiseVisualization = ({ width, height, value }: Props) => {
  const ratio = value / 100;

  const innerWidth = width - 20;
  const innerHeight = height - 60;

  const curve = {
    startPoint: [0, innerHeight],
    controlPoint1: [innerWidth * 0.33, innerHeight * -1.75],
    controlPoint2: [innerWidth * 0.66, innerHeight * 2.25],
    endPoint: [innerWidth, innerHeight / 2],
  };

  const numOfPoints = innerWidth / 2 + 1;
  const data = range(numOfPoints)
    .map(i => {
      const t = i / numOfPoints;

      const [x, y] = getValuesForBezierCurve(curve, t);

      // Depending on the ratio, we want to mix between a random set of values
      // and this

      return `${x},${y}`;
    })
    .join(', ');

  return (
    <Svg width={innerWidth} height={innerHeight}>
      {/*
      TODO: Uncomment this, use it when ratio is 0.

      <path
        d={`
          M 0,${innerHeight}
          C ${innerWidth * 0.33},${innerHeight * -1.75}
            ${innerWidth * 0.66},${innerHeight * 2.25}
            ${innerWidth},${innerHeight / 2}
        `}
        stroke={COLORS.aqua[500]}
        strokeWidth={5}
        strokeLinecap="round"
      /> */}
      <polyline
        points={points}
        stroke={COLORS.aqua[500]}
        strokeWidth={5}
        strokeLinecap="round"
      />
    </Svg>
  );
};

// $FlowFixMe
export default React.memo(NoiseVisualization);
