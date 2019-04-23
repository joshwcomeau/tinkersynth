import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring/hooks';

import { COLORS } from '../../../constants';
import { normalize, clamp } from '../../../utils';

const springConfig = {
  tension: 120,
  friction: 7,
};

const GradientWidthVisualization = ({ value, size, isAnimated }) => {
  console.log(value);

  const spring = useSpring({
    transform: `scaleX(${value * 0.015 + 0.2})`,
    config: springConfig,
    immediate: !isAnimated,
  });

  return (
    <Wrapper style={{ width: size, height: size }}>
      <Shadow />
      <WidthGradient style={spring} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /*
  It's possible for the WidthGradient to overflow, but we don't want to show it
  */
  overflow: hidden;
`;

const Shadow = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
`;

const WidthGradient = styled(animated.div)`
  position: absolute;
  z-index: 1;
  top: 0;
  left: -25%;
  right: -25%;
  bottom: 0;
  transform-origin: center center;
  background: linear-gradient(
    270deg,
    hsla(200, 90%, 55%, 0%) 0%,
    hsla(200, 90%, 55%, 100%) 51.04%,
    hsla(200, 90%, 55%, 0%) 100%
  );
`;

export default GradientWidthVisualization;
