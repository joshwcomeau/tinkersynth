// @flow
import React from 'react';

type Props = {
  isFalling: boolean,
  children: React$Node,
};

const GRAVITY = 35; // # of pixels per second of downward acceleration

const fallenStyles = {
  opacity: 0,
  pointerEvents: 'none',
};

const Falling = ({ isFalling, children }: Props) => {
  const [hasFallenOffScreen, setHasFallenOffScreen] = React.useState();

  const ref = React.useRef();
  const animationFrameId = React.useRef(null);

  const velocity = React.useRef(0);
  const translate = React.useRef(0);

  React.useEffect(
    () => {
      if (!isFalling) {
        return;
      }

      let now = performance.now();

      const tick = () => {
        translate.current += velocity.current;

        if (translate.current > window.innerHeight) {
          setHasFallenOffScreen(true);
          return;
        }

        if (!ref.current || typeof translate.current !== 'number') {
          return;
        }

        ref.current.style.transform = `translateY(${translate.current}px)`;

        const duration = performance.now() - now;

        velocity.current += (duration / 1000) * GRAVITY;

        now = performance.now();

        animationFrameId.current = window.requestAnimationFrame(tick);
      };

      animationFrameId.current = window.requestAnimationFrame(tick);

      return () => {
        window.cancelAnimationFrame(animationFrameId.current);
      };
    },
    [isFalling]
  );

  return (
    <div ref={ref} style={hasFallenOffScreen && fallenStyles}>
      {children}
    </div>
  );
};

// $FlowIgnore
export default React.memo(Falling);
