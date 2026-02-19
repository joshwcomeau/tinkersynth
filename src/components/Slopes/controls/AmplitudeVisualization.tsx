import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring/hooks';

import { COLORS } from '../../../constants';
import { range, normalize } from '../../../utils';
import { createSvgPathForPoints } from '../../../helpers/line.helpers';

import Svg from '../../Svg';

// Increase to improve performance.
const RESOLUTION = 2;

const calculatePathFromValue = (value, size) => {
  const ratio = value / 100;
  const maxAmplitude = size * 0.4;
  const amplitude = maxAmplitude * ratio;

  const maxX = Math.PI * 2;

  const numOfPoints = Math.floor(size / RESOLUTION);

  const points = range(numOfPoints).map(i => {
    const ratio = (i / numOfPoints) * maxX;

    const x = i * RESOLUTION;
    const y = Math.sin(ratio + maxX / 2) * amplitude + size / 2;

    return [x, y];
  });

  return createSvgPathForPoints(points);
};

const AmplitudeVisualization = ({ value, size, padding = 6, isAnimated }) => {
  const innerSize = size - padding * 2;

  const spring = useSpring({
    value,
    config: {
      tension: 80,
      friction: 14,
    },
    immediate: !isAnimated,
  });

  return (
    <Wrapper style={{ width: size, height: size }}>
      <Svg width={innerSize} height={innerSize} fill="none">
        <animated.path
          d={spring.value.interpolate(v =>
            calculatePathFromValue(v, innerSize)
          )}
          fill="none"
          stroke={COLORS.red[300]}
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </Svg>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default AmplitudeVisualization;
