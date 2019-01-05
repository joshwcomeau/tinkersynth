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

const getFinalPosition = (angle, distance) => {
  const angleInRads = (angle * Math.PI) / 180;

  const deltaY = Math.sin(angleInRads) * distance;
  const deltaX = Math.cos(angleInRads) * distance;

  return [deltaX, deltaY];
};

const Particle = ({ angle, distance, rotation, color, shape }: Props) => {
  const timeoutRef = useRef(null);
  const pathRef = useRef(null);
  const [hasBegun, setBegin] = useState(false);

  const delay = 1000 + Math.random() * 3000;

  useEffect(() => {
    // A lot of stuff happens when the app mounts. Delay the logo particle
    // effects a bit
    timeoutRef.current = window.setTimeout(() => {
      setBegin(true);
    }, delay);

    return () => {
      window.clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!hasBegun) {
    return null;
  }

  const [deltaX, deltaY] = getFinalPosition(angle, distance);

  const translateSpringSettings = {
    tension: 20 + distance * 0.5,
    friction: 5,
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
          (x, y) => `translate(${x}px, ${y}px) rotate(${rotation}deg)`
        ),
      }}
    >
      <Shape color={color} />
    </animated.div>
  );
};

export default Particle;
