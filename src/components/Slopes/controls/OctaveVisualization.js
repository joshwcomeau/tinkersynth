import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring/hooks';

import { COLORS } from '../../../constants';
import { range, normalize } from '../../../utils';
import { createSvgPathForPoints } from '../../../helpers/line.helpers';
import { getPerlinValueWithOctaves } from '../../Slopes/Slopes.helpers';

import Svg from '../../Svg';

// Increase to improve performance.
const RESOLUTION = 2;

const waveLength = Math.PI;

const noiseGenerator = x => {
  // x is a number from 0 to 2Pi. Since our frequency is assumed to be 1,
  // this works without any further tweaks (since our wavelength is 2Pi)
  return Math.sin(x) * -1;
};

const calculatePathFromValue = (value, size) => {
  const numOfPoints = Math.floor(size / RESOLUTION);

  const numOfOctaves = normalize(value, 0, 100, 1, 3.5);

  const rootAmplitude = size * 0.4;

  const points = range(numOfPoints).map(i => {
    const ratio = (i / numOfPoints) * waveLength;

    const x = i * RESOLUTION;
    const y =
      getPerlinValueWithOctaves(
        noiseGenerator,
        ratio,
        null,
        rootAmplitude,
        numOfOctaves
      ) +
      size / 2;

    return [x, y];
  });

  return createSvgPathForPoints(points);
};

const OctaveVisualization = ({ value, size, padding = 6, isAnimated }) => {
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
          stroke={COLORS.aqua[300]}
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

export default OctaveVisualization;
