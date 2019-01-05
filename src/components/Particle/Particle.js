// @flow
import React, { useState, useRef, useEffect } from 'react';
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
  rotation: number,
  color: string,
  shape: 'OpenCircle' | 'Squiggle' | 'Star' | 'Swirl' | 'X',
};

const Particle = ({ angle, distance, rotation, color, shape }: Props) => {
  const spring = useSpring({
    rotation,
    from: {
      rotation: 0,
    },
    config: {
      tension: 100,
      friction: 10,
    },
  });

  const Shape = shapeMap[shape];

  return (
    <div
      style={{
        transform: spring.rotation.interpolate(
          rotation => `rotate(${rotation}deg)`
        ),
      }}
    >
      <Shape color={color} />
    </div>
  );
};

export default Particle;
