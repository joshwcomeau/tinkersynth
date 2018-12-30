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
  children: React$Node,
};

const PRECISION = 0.2;

const useDropPhysics = ({ distance, bounciness, gravity = 0.2 }) => {
  const [amountFallen, setAmountFallen] = useState(0);
  const [scaleX, setScaleX] = useState(0);
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
      lastTickAt.current = now;

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
          velocity.current = augmentedVelocity * (-1 * bounciness);
          setAmountFallen(distance);
        }

        // $FlowIgnore - velocity.current can never be null.
        const velocityDelta = originalVelocity - velocity.current;

        if (velocityDelta > 0) {
          setScaleX(normalize(velocityDelta, 0, 5, 1, 1.5));
        } else {
          if (scaleX > 1) {
            setScaleX(scaleX - 0.1);
          }
        }
      });

      return () => {
        window.cancelAnimationFrame(animationFrameId.current);
      };
    },
    [amountFallen, scaleX, velocity]
  );

  return { amountFallen, scaleX };
};

const Drop = ({ children, ...physicsStuff }: Props) => {
  const { amountFallen, scaleX } = useDropPhysics(physicsStuff);

  const offset = -physicsStuff.distance + amountFallen;

  return (
    <Wrapper
      style={{
        transform: `translateY(${offset}px) scaleX(${scaleX})`,
      }}
    >
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  will-change: transform;
  transform-origin: center center;
`;

export default Drop;
