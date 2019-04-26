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

const PersonInflateVisualization = ({ value, size, isAnimated }) => {
  const headSpring = useSpring({
    translate: (value / 100) * -3,
    config: springConfig,
    immediate: !isAnimated,
  });
  const bodyRadius = useSpring({
    rx: normalize(value, 0, 100, 0.5, 8),
    ry: normalize(value, 0, 100, 5, 8.5),
    config: springConfig,
    immediate: !isAnimated,
  });

  const leftLegPoints = useSpring({
    x1: normalize(value, 0, 100, 13.5528, 11.5528),
    y1: 29.6584,
    x2: normalize(value, 0, 100, 17.6584, 15.6584),
    y2: 21.4472,
    config: springConfig,
    immediate: !isAnimated,
  });

  const rightLegPoints = useSpring({
    x1: normalize(value, 0, 100, 22.4472, 24.4472),
    y1: 29.6584,
    x2: normalize(value, 0, 100, 18.3416, 20.3416),
    y2: 21.4472,
    config: springConfig,
    immediate: !isAnimated,
  });

  const leftArmPoints = useSpring({
    x1: normalize(value, 0, 100, 12, 9.38675),
    y1: normalize(value, 0, 100, 18.5858, 10.7226),
    x2: normalize(value, 0, 100, 16.5858, 13.7227),
    y2: normalize(value, 0, 100, 14, 13.6132),
    config: springConfig,
    immediate: !isAnimated,
  });

  const rightArmPoints = useSpring({
    x1: normalize(value, 0, 100, 23.5906, 26.872),
    y1: normalize(value, 0, 100, 18.8829, 10.4084),
    x2: normalize(value, 0, 100, 19.3662, 22.4084),
    y2: normalize(value, 0, 100, 13.8927, 14.128),
    config: springConfig,
    immediate: !isAnimated,
  });

  return (
    <Wrapper style={{ width: size, height: size }}>
      <Svg width={size - 2} height={size - 2} viewBox="0 0 36 36" fill="none">
        {/* Left leg */}
        <animated.line
          {...leftLegPoints}
          stroke={COLORS.green[300]}
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Right leg */}
        <animated.line
          {...rightLegPoints}
          stroke={COLORS.green[300]}
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Left arm */}
        <animated.line
          {...leftArmPoints}
          stroke={COLORS.green[300]}
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Right arm */}
        <animated.line
          {...rightArmPoints}
          stroke={COLORS.green[300]}
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/*
          When the body is TOTALLY uninflated, it looks a bit funny on its own.
          Add a straight line behind it, so that when it's totally uninflated,
          we see this instead.
        */}
        <line
          x1={18}
          y1={5}
          x2={18}
          y2={23}
          stroke={COLORS.green[300]}
          strokeWidth={2}
        />

        {/* Body */}
        <animated.ellipse
          cx="18"
          cy="17"
          rx={bodyRadius.rx.interpolate(rx => clamp(rx, 0, 1000))}
          ry={bodyRadius.ry.interpolate(ry => clamp(ry, 0, 1000))}
          fill={COLORS.gray[900]}
          stroke={COLORS.green[300]}
          strokeWidth={2}
          style={{
            opacity: value ? 1 : 0,
          }}
        />

        {/* Head */}
        <animated.path
          d="M20.6643 11.5275C18.5522 13.0041 15.8999 12.5663 14.6844 10.8275C13.4688 9.08867 13.9685 6.44741 16.0807 4.97084C18.1928 3.49428 20.8451 3.93207 22.0606 5.67089C23.2762 7.40971 22.7765 10.051 20.6643 11.5275Z"
          fill={COLORS.gray[900]}
          stroke={COLORS.green[300]}
          strokeWidth="2"
          transform={headSpring.translate.interpolate(x => `translate(0 ${x})`)}
          // transform={}
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

export default PersonInflateVisualization;
