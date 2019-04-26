import React from 'react';
import styled from 'styled-components';

import Cat from '../Cat';

const useTranslateFromOffscreen = (ref, walkSpeed, handleReachDestination) => {
  const lastFrameAt = React.useRef(null);
  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    // TODO: Add timeout so that this doesn't start right away.

    // We want to have the cat walk in from beyond the left edge of the screen.
    // To accomplish this, we need to know how many pixels that is, so we know
    // the distance we need to travel. I use `right` instead of `left` since
    // that includes the width of the element.
    const totalWalkDistance = ref.current.getBoundingClientRect().right;

    setOffset(-totalWalkDistance);
  }, []);

  React.useEffect(() => {
    if (Math.abs(offset) > walkSpeed) {
      window.requestAnimationFrame(() => {
        // Allow the entity to move in either direction
        const multiplier = offset > 0 ? -1 : 1;

        let increment;

        if (typeof lastFrameAt.current === 'number') {
          const timeSinceLastFrame = performance.now() - lastFrameAt.current;
          // I assume I want to move `walkSpeed` pixels every 1/60th of a
          // second. If the animation is running slower than that, I should
          // move further on each frame.
          const framesPerSecond = timeSinceLastFrame;
          const fpsAdjustment = framesPerSecond / 60;

          increment = walkSpeed * fpsAdjustment;
        } else {
          increment = walkSpeed;
        }
        setOffset(offset + increment);

        lastFrameAt.current = performance.now();
      });
    } else if (offset !== 0) {
      window.requestAnimationFrame(() => {
        setOffset(0);
        handleReachDestination();
      });
    }
  });

  return offset;
};

const SlopesCat = ({ walkSpeed = 8 }) => {
  const [status, setStatus] = React.useState('walking');

  const wrapperRef = React.useRef(null);
  const offset = useTranslateFromOffscreen(wrapperRef, walkSpeed, () => {
    setStatus('sitting');
  });

  return (
    <Wrapper ref={wrapperRef} style={{ transform: `translateX(${offset}px)` }}>
      <Cat status={status} />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default SlopesCat;
