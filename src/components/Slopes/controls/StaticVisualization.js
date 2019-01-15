import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring/hooks';

import { COLORS } from '../../../constants';
import { normalize, clamp } from '../../../utils';
import radarSweep from '../../../images/radar-sweep-2x.png';

import Svg from '../../Svg';
import StaticNoise from './StaticNoise';

const getSweepAngle = value => {
  const rotationOffset = 180;
  const numOfSweeps = 2;

  return normalize(
    value,
    0,
    100,
    rotationOffset * -1,
    rotationOffset * -1 + numOfSweeps * 360 * -1
  );
};

const getSweepOpacity = value => {
  return clamp(normalize(value, 0, 100, 0, 10), 0, 1);
};

const StaticVisualization = ({ value, size, isAnimated }) => {
  const isEnemyVisible = value > 34;

  const noisePadding = 3;

  const spring = useSpring({
    value,
    config: {
      tension: 120,
      friction: 12,
    },
    immediate: !isAnimated,
  });

  return (
    <Wrapper>
      <NoiseWrapper style={{ margin: noisePadding }}>
        <StaticNoise size={size - noisePadding * 2} value={value} />
      </NoiseWrapper>
      <Sweep
        src={radarSweep}
        style={{
          width: size,
          height: size,
          transform: spring.value.interpolate(
            val => `rotate(${getSweepAngle(val)}deg)`
          ),
          opacity: spring.value.interpolate(val => getSweepOpacity(val)),
        }}
      />
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <defs>
          <filter
            id="static-viz-filter0"
            x="18.4921"
            y="18.4998"
            width="8.01592"
            height="7.72148"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dx="0.5" dy="0.5" />
            <feGaussianBlur stdDeviation="0.5" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.14902 0 0 0 0 0.14902 0 0 0 0 0.14902 0 0 0 0.52 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow"
              result="shape"
            />
          </filter>
        </defs>

        <circle
          cx="16"
          cy="16"
          r="3.11905"
          stroke="#009E69"
          strokeWidth={1}
          strokeOpacity="0"
        />
        <circle
          cx="16"
          cy="15.9999"
          r="6.2619"
          stroke="#009E69"
          strokeWidth={1}
          strokeOpacity="0"
        />
        <circle
          cx="16"
          cy="16"
          r="9.40476"
          stroke="#009E69"
          strokeWidth={1}
          strokeOpacity="0"
        />
        <line
          x1={6}
          y1={16.5}
          x2={26}
          y2={16.5}
          stroke={COLORS.green[500]}
          strokeWidth={2}
          strokeLinecap="round"
        />
        <line
          x1={16.5}
          y1={7}
          x2={16.5}
          y2={27}
          stroke={COLORS.green[500]}
          strokeWidth={2}
          strokeLinecap="round"
        />

        <g filter="url(#static-viz-filter0)">
          <path
            d="M22 19L22.0018 21.9976L24.8532 21.0729L22.0029 22.0009L23.7634 24.4271L22 22.003L20.2366 24.4271L21.9971 22.0009L19.1468 21.0729L21.9982 21.9976L22 19Z"
            stroke="white"
            strokeWidth={2}
            style={{
              opacity: isEnemyVisible ? 1 : 0,
              transition: 'opacity 600ms',
            }}
          />
        </g>
      </svg>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const NoiseWrapper = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Sweep = styled(animated.img)`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  transform-origin: center center;
`;

export default StaticVisualization;
