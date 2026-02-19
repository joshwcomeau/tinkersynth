import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring/hooks';

import { COLORS } from '../../../constants';
import { range, normalize } from '../../../utils';

import Svg from '../../Svg';

// Increase to improve performance.
const RESOLUTION = 2;

const createSVGPathFromWaveformPoints = points =>
  points.reduce((acc, [x, y], index) => {
    // For the very first point, we have to Move to that area
    if (index === 0) {
      return `M ${x},${y} `;
    }

    // For all subsequent points, we can just draw a line to it.
    return `${acc} L ${x},${y}`;
  }, '');

const calculatePathFromValue = (value, size) => {
  const maxValue = normalize(value, 0, 100, 0.25 * Math.PI, 5.75 * Math.PI);
  const waveAmplitude = size * 0.4;

  const numOfPoints = Math.floor(size / RESOLUTION);

  const points = range(numOfPoints).map(i => {
    // I want it to start at the bottom of the curve, rather than at the
    // X axis, so offset it by 0.25 a cycle.
    const offset = Math.PI * 0.5;
    const ratio = (i / numOfPoints) * maxValue + offset;

    const x = i * RESOLUTION;
    const y = Math.sin(ratio + maxValue / 2) * waveAmplitude + size / 2;

    return [x, y];
  });

  return createSVGPathFromWaveformPoints(points);
};

const WavelengthVisualization = ({ value, size, padding = 6, isAnimated }) => {
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
          stroke={COLORS.yellow[300]}
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

export default WavelengthVisualization;
