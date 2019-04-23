import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring/hooks';

import { COLORS } from '../../../constants';
import { normalize, clamp } from '../../../utils';

import Svg from '../../Svg';

const springConfig = {
  tension: 120,
  friction: 7,
};

const getPoints = (width, height, value) => {
  const verticalShift = normalize(value, 0, 100, 0, -4);

  // Our first point starts at the bottom midpoint and stretches to the left
  // as the value increases
  const p1 = [normalize(value, 0, 100, width / 2, 0), height + verticalShift];

  // Our second point doesnt move (should it?)
  const p2 = [width / 2, verticalShift];

  // Our last point is a mirror of the first one
  const p3 = [
    normalize(value, 0, 100, width / 2, width),
    height + verticalShift,
  ];

  return [p1.join(','), p2.join(','), p3.join(',')].join(' ');
};

const GradientWidthVisualization = ({ value, size, isAnimated }) => {
  const spring = useSpring({
    value,
    config: springConfig,
    immediate: !isAnimated,
  });

  const triangleWidth = size - 14;
  const triangleHeight = size - 20;

  return (
    <Wrapper style={{ width: size, height: size }}>
      <Svg
        width={triangleWidth}
        height={triangleHeight}
        viewBox="0 0 30 24"
        fill="none"
      >
        <Polygon
          points={spring.value.interpolate(value => getPoints(30, 24, value))}
          fill="none"
          stroke={COLORS.yellow[300]}
          strokeWidth={3}
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

const Polygon = styled(animated.polygon)`
  will-change: transform;
`;

export default GradientWidthVisualization;
