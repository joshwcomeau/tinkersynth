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
  isBroken: boolean,
};

const getGridRotation = ratio => ratio * 50;

const PerspectiveVisualization = ({
  width,
  height,
  value,
  isBroken,
}: Props) => {
  const ratio = 1 - value / 100;

  const gridSpring = useSpring({
    ratio,
    config: { tension: 120, friction: 29 },
  });
  const mountainSpring = useSpring({
    ratio,
    config: { tension: 200, friction: 30 },
  });
  const sunSpring = useSpring({
    ratio,
    config: { tension: 80, friction: 10 },
  });

  const gridHeight = height * 0.75;
  const gridWidth = gridHeight * (4 / 3);

  return (
    <Wrapper
      style={{
        width,
        height,
      }}
    >
      <GridWrapper
        style={{
          width: gridWidth,
          height: gridHeight,
          transform: gridSpring.ratio.interpolate(
            ratio => `perspective(200px) rotateX(${getGridRotation(ratio)}deg)`
          ),
        }}
      >
        <Grid
          height={gridHeight}
          width={gridWidth}
          rows={6}
          cols={8}
          stroke={isBroken ? COLORS.white : COLORS.blue[700]}
          strokeWidth={2}
        />
        <Mountain
          width={gridWidth * 0.5}
          viewBox="0 0 46 30"
          style={{
            top: gridHeight * (1.5 / 6),
            left: gridWidth * (3 / 8),
            transform: mountainSpring.ratio.interpolate(
              ratio => `translateZ(1px) rotateX(${-getGridRotation(ratio)}deg)`
            ),
          }}
        >
          <path
            d="M23 1C11.5 1 1 29 1 29H45C45 29 34.5 1 23 1"
            fill={isBroken ? COLORS.red[500] : COLORS.gray[1000]}
          />
          <path
            d="M23 1C11.5 1 1 29 1 29 M45 29 C45 29 34.5 1 23 1"
            fill="none"
            stroke={isBroken ? COLORS.white : COLORS.green[500]}
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
            transform: mountainSpring.ratio.interpolate(
              ratio => `translateZ(1px) rotateX(${-getGridRotation(ratio)}deg)`
            ),
          }}
        >
          <path
            d="M23 1C15 1 1 45 1 45H45C45 45 31 1 23 1"
            fill={isBroken ? COLORS.red[500] : COLORS.gray[1000]}
          />
          <path
            d="M23 1C15 1 1 45 1 45 M 45 45 C45 45 31 1 23 1"
            fill="none"
            stroke={isBroken ? COLORS.white : COLORS.green[500]}
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
            transform: sunSpring.ratio.interpolate(
              ratio => `
                translate3d(
                  ${ratio * 20}px,
                  ${ratio * -110}px,
                  ${ratio * 40 - 5}px
                )
                rotateX(${-getGridRotation(ratio)}deg)
              `
            ),
          }}
        >
          <circle
            cx="8"
            cy="8"
            r="5"
            stroke={isBroken ? COLORS.white : COLORS.yellow[300]}
            fill={isBroken ? COLORS.red[500] : COLORS.gray[1000]}
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

const Mountain = styled(animated.svg)`
  position: absolute;
  z-index: 2;
  transform-origin: bottom center;
  transform-style: preserve-3d;
  overflow: visible;
`;

const Sun = styled(animated.svg)`
  position: absolute;
  z-index: 1;
  transform-origin: bottom center;
  transform-style: preserve-3d;
`;

export default PerspectiveVisualization;
