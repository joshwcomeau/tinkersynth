// @flow
import React, { useState } from 'react';
import { useSpring, animated, interpolate } from 'react-spring/hooks';
import styled from 'styled-components';

import { COLORS } from '../../constants';

import { OpenCircle, Squiggle, Star, Swirl, X } from './shapes';

const shapeMap = {
  OpenCircle,
  Squiggle,
  Star,
  Swirl,
  X,
};

type Props = {
  angle: number,
  distance: number,
  spin: number,
  shape: 'OpenCircle' | 'Squiggle' | 'Star' | 'Swirl' | 'X',
};

const getFinalPosition = (angle, distance) => {
  const angleInRads = (angle * Math.PI) / 180;

  const deltaY = Math.sin(angleInRads) * distance;
  const deltaX = Math.cos(angleInRads) * distance;

  return [deltaX, deltaY];
};

const Particle = ({ angle, distance, rotation, shape }: Props) => {
  const [deltaX, deltaY] = getFinalPosition(angle, distance);

  const translateSpringSettings = {
    tension: distance * 0.5,
    friction: 25,
  };

  const translateSpring = useSpring({
    x: deltaX,
    y: deltaY,
    from: {
      x: 0,
      y: 0,
    },
    config: translateSpringSettings,
  });

  const Shape = shapeMap[shape];

  return (
    <animated.div
      style={{
        transform: interpolate(
          [translateSpring.x, translateSpring.y],
          (x, y) => `translate(${x}px, ${y}px)`
        ),
      }}
    >
      <Shape color={COLORS.pink[500]} />
    </animated.div>
  );
};

export default Particle;
