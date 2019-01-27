// @flow
import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring/hooks';

import {
  COLORS,
  UNIT,
  DARK_BACKGROUND,
  LIGHT_BACKGROUND,
} from '../../constants';

import type { CanvasSize } from '../../types';

type Props = {
  size: CanvasSize,
  enableDarkMode: boolean,
  children: React$Node,
};

const AQUA_CIRCLE_OFFSET = {
  small: { transform: `translate(110px, 310px)` },
  medium: { transform: `translate(285px,130px)` },
  large: { transform: `translate(160px, -5px)` },
};
const PINK_CIRCLE_OFFSET = {
  small: { transform: `translate(220px, 35px)` },
  medium: { transform: `translate(200px, 20px)` },
  large: { transform: `translate(240px, -30px)` },
};
const YELLOW_CIRCLE_OFFSET = {
  small: { transform: `translate(180px, 90px)` },
  medium: { transform: `translate(70px,375px)` },
  large: { transform: `translate(120px, 420px)` },
};
const GREEN_CIRCLE_OFFSET = {
  small: { transform: `translate(60px, 225px)` },
  medium: { transform: `translate(20px,235px)` },
  large: { transform: `translate(30px, 300px)` },
};

const FRAME_OFFSETS = {
  small: { top: 150, left: 150 },
  medium: { top: 95, left: 105 },
  large: { top: 40, left: 85 },
};

// HACK: This component positions itself relative to the parent.
// If you try to put this in any other container, it'll be positioned weird
// This was a shortcut, since it makes it easy to position the decorative
// circles.
// In the future, I should either increase the abstraction to include the
// entire right-hand side (with the console table and plant), or I should
// split it up so that `HangingCanvas` is just the frame, and a separate
// component exists for the circles.
const HangingCanvas = ({ size, enableDarkMode, children }: Props) => {
  const backgroundColor = enableDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND;

  const frameOffset = FRAME_OFFSETS[size];

  const aquaSpring = useSpring({
    ...AQUA_CIRCLE_OFFSET[size],
    config: {
      tension: 20,
      friction: 5,
    },
  });
  const pinkSpring = useSpring({
    ...PINK_CIRCLE_OFFSET[size],
    config: {
      tension: 10,
      friction: 5,
    },
  });
  const yellowSpring = useSpring({
    ...YELLOW_CIRCLE_OFFSET[size],
    config: {
      tension: 30,
      friction: 5,
    },
  });
  const greenSpring = useSpring({
    ...GREEN_CIRCLE_OFFSET[size],
    config: {
      tension: 15,
      friction: 5,
    },
  });

  return (
    <Wrapper>
      <Frame style={frameOffset}>
        <CanvasWrapper style={{ backgroundColor }}>{children}</CanvasWrapper>
      </Frame>
      <Decorations>
        <Circle size={138} color={COLORS.aqua[300]} style={aquaSpring} />
        <Circle size={192} color={COLORS.pink[300]} style={pinkSpring} />
        <Circle size={64} color={COLORS.yellow[300]} style={yellowSpring} />
        <Circle size={155} color={COLORS.green[300]} style={greenSpring} />
      </Decorations>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`;

const Frame = styled.div`
  position: absolute;
  z-index: 2;
  border: 3px solid ${COLORS.gray[900]};
  border-radius: 2px;
`;

const CanvasWrapper = styled.div`
  position: relative;
  border: 5px solid ${COLORS.white};
`;

const Decorations = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Circle = styled(animated.div)`
  position: absolute;
  width: ${props => props.size + 'px'};
  height: ${props => props.size + 'px'};
  border-radius: 50%;
  mix-blend-mode: multiply;
  background-color: ${props => props.color};
  opacity: 0.9;
`;

export default HangingCanvas;
