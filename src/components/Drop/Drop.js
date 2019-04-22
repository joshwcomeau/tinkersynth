// @flow
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import { normalize } from '../../utils';

type Props = {
  // The number of pixels between the start position and the ground.
  distance: number,
  // How much the ball should bounce, when it hits the ground.
  // Between 0 (bowling ball) and 1 (world's best superball).
  bounciness: number,
  // Amount of downward acceleration.
  // Between 0 (space) and 1 (omg I can't move)
  gravity?: number,
  squishiness: number,
  children: React$Node,
};

const PRECISION = 0.15;

const useDropPhysics = ({
  distance,
  bounciness,
  squishiness = 1.4,
  gravity = 0.2,
}) => {
  const [amountFallen, setAmountFallen] = useState(0);
  const [squash, setSquash] = useState(1);
  const velocity = useRef(1);
  const animationFrameId = useRef(null);
  const lastTickAt = useRef(null);

  useEffect(
    () => {
      // If this is the very first tick, we don't know how much time we expect to
      // have passed. Let's assume that each frame takes 30ms to pass.
      const tickOrDefault = lastTickAt.current || performance.now() - 30;
      const now = performance.now();
      const timeSinceLastTick = (now - tickOrDefault) / 1000;

      const originalVelocity = velocity.current;

      velocity.current = originalVelocity + gravity * 50 * timeSinceLastTick;

      const augmentedVelocity = velocity.current;

      animationFrameId.current = window.requestAnimationFrame(() => {
        let tentativeNewPosition = amountFallen + augmentedVelocity;

        if (
          Math.abs(augmentedVelocity) < PRECISION &&
          Math.abs(distance - amountFallen) < PRECISION
        ) {
          lastTickAt.current = null;
          return;
        }

        if (tentativeNewPosition < distance) {
          setAmountFallen(tentativeNewPosition);
        } else {
          velocity.current = velocity.current * (-1 * bounciness);
          setAmountFallen(distance);
        }

        // $FlowIgnore - velocity.current can never be null.
        const velocityDelta = originalVelocity - velocity.current;

        if (velocityDelta > 0) {
          setSquash(normalize(velocityDelta, 0, 5, 1, squishiness));
        } else {
          if (squash > 1) {
            setSquash(squash - 0.05);
          }
        }
      });

      lastTickAt.current = now;

      return () => {
        window.cancelAnimationFrame(animationFrameId.current);
      };
    },
    [amountFallen, squash]
  );

  return { amountFallen, squash };
};

const Drop = ({ children, ...physicsStuff }: Props) => {
  const { amountFallen, squash } = useDropPhysics(physicsStuff);

  const offset = -physicsStuff.distance + amountFallen;

  const scaleX = squash;
  const scaleY = 1 + (1 - squash);

  return (
    <Wrapper
      style={{
        transform: `translateY(${offset}px) scaleX(${scaleX}) scaleY(${scaleY})`,
      }}
    >
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  will-change: transform;
  transform-origin: bottom center;
`;

export default Drop;
