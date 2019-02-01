// @flow
import React from 'react';
import styled from 'styled-components';

import UnstyledButton from '../UnstyledButton';

type Props = {
  id: string,
  angle: number,
  velocity: number,
  handlePop?: (id: string) => void,
  children: React$Node,
};

const GRAVITY = 50; // # of pixels per second of downward acceleration

const PopcornKernel = ({ id, angle, velocity, handlePop, children }: Props) => {
  const ref = React.useRef({});

  const [isFalling, setIsFalling] = React.useState();

  const [hasFallenOffScreen, setHasFallenOffScreen] = React.useState();

  const animationFrameId = React.useRef(null);

  const velocityX = React.useRef(0);
  const velocityY = React.useRef(0);
  const translate = React.useRef({ x: 0, y: 0 });

  // angle and velocity are only used initially; after that, gravity affects
  // things.
  React.useEffect(() => {
    const angleInRads = (angle / 180) * Math.PI;

    velocityX.current = Math.cos(angleInRads) * velocity;
    velocityY.current = Math.sin(angleInRads) * velocity;
  }, []);

  React.useEffect(
    () => {
      if (!isFalling || !ref.current) {
        return;
      }

      let now = performance.now();

      const tick = () => {
        const nextX = translate.current.x + velocityX.current;
        const nextY = translate.current.y + velocityY.current;

        if (nextY > window.innerHeight) {
          setIsFalling(false);
          setHasFallenOffScreen(true);
          return;
        }

        translate.current = { x: nextX, y: nextY };

        ref.current.style.transform = `
          translate(${translate.current.x}px, ${translate.current.y}px)
        `;

        const duration = performance.now() - now;

        velocityY.current += (duration / 1000) * GRAVITY;

        now = performance.now();

        animationFrameId.current = window.requestAnimationFrame(tick);
      };

      animationFrameId.current = window.requestAnimationFrame(tick);

      return () => {
        window.cancelAnimationFrame(animationFrameId.current);
      };
    },
    [isFalling, translate.current, ref.current]
  );

  if (hasFallenOffScreen) {
    return null;
  }

  return (
    <Wrapper
      ref={ref}
      onClick={() => {
        setIsFalling(true);

        if (typeof handlePop === 'function') {
          handlePop(id);
        }
      }}
    >
      <ClickExtender />

      {children}
    </Wrapper>
  );
};

const Wrapper = styled(UnstyledButton)`
  perspective: 500px;
  position: relative;
  will-change: transform;
`;

const ClickExtender = styled.div`
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
`;

export default React.memo(PopcornKernel);
