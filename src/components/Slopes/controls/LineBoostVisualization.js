// @flow
import React from 'react';
import { useSpring, animated } from 'react-spring/hooks';

import { COLORS } from '../../../constants';

import Svg from '../../Svg';

type Props = {
  width: number,
  height: number,
  value: number,
};

const LineBoostVisualization = ({ width, value }: Props) => {
  // NOTE: For this to be pixel-perfect, height should be a multiple of 23.
  // I'm going to hard-set this value instead of using the prop, although if
  // the layout changes this will need to be revisited.
  const height = 23;

  const isBoosted = value;

  const outerConfig = { tension: 180, friction: 10 };
  const innerConfig = { tension: 180, friction: 20 };

  const sharedValues = {
    x1: 1,
    x2: width - 1,
    strokeWidth: 2,
    strokeLinecap: 'round',
    style: {
      transition: 'all 300ms',
    },
  };

  const lineData = [
    useSpring({
      stroke: COLORS.red[300],
      y1: isBoosted ? 1 : 4,
      y2: isBoosted ? 1 : 4,
      config: outerConfig,
      ...sharedValues,
    }),
    useSpring({
      stroke: COLORS.yellow[500],
      y1: isBoosted ? 6 : 11,
      y2: isBoosted ? 6 : 11,
      config: innerConfig,
      ...sharedValues,
    }),
    useSpring({
      stroke: COLORS.blue[300],
      y1: isBoosted ? 16 : 11,
      y2: isBoosted ? 16 : 11,
      ...sharedValues,
    }),
    useSpring({
      stroke: COLORS.green[500],
      y1: 11,
      y2: 11,
      config: innerConfig,
      ...sharedValues,
    }),

    useSpring({
      stroke: COLORS.violet[300],
      y1: isBoosted ? 21 : 18,
      y2: isBoosted ? 21 : 18,
      config: outerConfig,
      ...sharedValues,
    }),
  ];

  return (
    <Svg width={width} height={height}>
      {lineData.map((lineDatum, index) => (
        <animated.line key={index} {...lineDatum} />
      ))}
    </Svg>
  );
};

export default LineBoostVisualization;
