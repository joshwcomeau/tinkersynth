// @flow
import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring/hooks';

import { COLORS, UNIT } from '../../constants';

import type { CanvasSize } from '../../types';

type Props = {
  size: CanvasSize,
};

// TODO: All these numbers are very specific to the current "slopes" storefront.
// I should probably make them all relative to the frame size and offset?
const AQUA_CIRCLE_OFFSET = {
  small: { transform: `translate(110px, 310px)` },
  medium: { transform: `translate(310px, 90px)` },
  large: { transform: `translate(185px, -5px)` },
};
const PINK_CIRCLE_OFFSET = {
  small: { transform: `translate(220px, 35px)` },
  medium: { transform: `translate(225px, 25px)` },
  large: { transform: `translate(265px, -30px)` },
};
const YELLOW_CIRCLE_OFFSET = {
  small: { transform: `translate(180px, 90px)` },
  medium: { transform: `translate(120px,350px)` },
  large: { transform: `translate(165px, 430px)` },
};
const GREEN_CIRCLE_OFFSET = {
  small: { transform: `translate(60px, 225px)` },
  medium: { transform: `translate(45px, 230px)` },
  large: { transform: `translate(40px, 300px)` },
};

const StorefrontPreviewDecorations = ({ size }: Props) => {
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
    <Decorations>
      <Circle size={138} color={COLORS.aqua[300]} style={aquaSpring} />
      <Circle size={192} color={COLORS.pink[300]} style={pinkSpring} />
      <Circle size={64} color={COLORS.yellow[300]} style={yellowSpring} />
      <Circle size={155} color={COLORS.green[300]} style={greenSpring} />
    </Decorations>
  );
};

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
  will-change: transform;
`;

export default StorefrontPreviewDecorations;
