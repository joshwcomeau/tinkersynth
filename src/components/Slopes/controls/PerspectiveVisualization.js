// @flow
import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring/hooks';

import { COLORS } from '../../../constants';

import Grid from './Grid';

type Props = {
  width: number,
  height: number,
  value: number,
};

const getGridRotation = ratio => ratio * 50;

const PerspectiveVisualization = ({ width, height, value }: Props) => {
  const ratio = 1 - value / 100;

  const spring = useSpring({ ratio, config: { tension: 120, friction: 25 } });

  const gridHeight = height * 0.75;
  const gridWidth = gridHeight * (4 / 3);

  return (
    <Wrapper style={{ width, height }}>
      <GridWrapper
        style={{
          width: gridWidth,
          height: gridHeight,
          transform: spring.ratio.interpolate(
            ratio => `perspective(200px) rotateX(${getGridRotation(ratio)}deg)`
          ),
        }}
      >
        <Grid
          height={gridHeight}
          width={gridWidth}
          rows={6}
          cols={8}
          stroke={COLORS.blue[700]}
          strokeWidth={2}
        />
        <Mountain
          width={gridWidth * 0.5}
          viewBox="0 0 46 30"
          style={{
            top: gridHeight * (1.5 / 6),
            left: gridWidth * (3 / 8),
            transform: `translateZ(1px) rotateX(${-getGridRotation(ratio)}deg)`,
          }}
        >
          <path
            d="M23 1C11.5 1 1 29 1 29H45C45 29 34.5 1 23 1"
            fill={COLORS.gray[900]}
          />
          <path
            d="M23 1C11.5 1 1 29 1 29 M45 29 C45 29 34.5 1 23 1"
            fill="none"
            stroke={COLORS.green[500]}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Mountain>
        <Mountain
          width={gridWidth * 0.5}
          viewBox="0 0 46 46"
          style={{
            top: gridHeight * (1 / 6),
            left: gridWidth * (1 / 8),
            transform: `translateZ(1px) rotateX(${-getGridRotation(ratio)}deg)`,
          }}
        >
          <path
            d="M23 1C15 1 1 45 1 45H45C45 45 31 1 23 1"
            fill={COLORS.gray[900]}
          />
          <path
            d="M23 1C15 1 1 45 1 45 M 45 45 C45 45 31 1 23 1"
            fill="none"
            stroke={COLORS.green[300]}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Mountain>
        <Sun
          width={gridWidth * 0.2}
          viewBox="0 0 16 16"
          style={{
            top: gridHeight * (2 / 6),
            left: gridWidth * (3 / 8),
            transform: `
              translate3d(
                ${ratio * 20}px,
                ${ratio * -90}px,
                ${ratio * 40 - 5}px
              )
              rotateX(${-getGridRotation(ratio)}deg)
            `,
          }}
        >
          <circle
            cx="8"
            cy="8"
            r="5"
            stroke={COLORS.yellow[300]}
            fill={COLORS.gray[900]}
            strokeWidth={2}
          />
        </Sun>
      </GridWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const GridWrapper = styled(animated.div)`
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: bottom center;
  transform-style: preserve-3d;
`;

const Mountain = styled.svg`
  position: absolute;
  z-index: 2;
  transform-origin: bottom center;
  transform-style: preserve-3d;
  overflow: visible;
`;

const Sun = styled.svg`
  position: absolute;
  z-index: 1;
  transform-origin: bottom center;
  transform-style: preserve-3d;
`;

export default PerspectiveVisualization;
