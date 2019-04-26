import React from 'react';
import styled from 'styled-components';
import { Tooltip } from 'react-tippy';

import useToggle from '../../hooks/toggle.hook';
import { setTimeoutPromise } from '../../utils';

import Cat from '../Cat';

const PATREON_URL = 'https://patreon.com';

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
  const [hasSeenTooltip, setHasSeenTooltip] = React.useState(false);
  const timeoutId = React.useRef(null);

  const wrapperRef = React.useRef(null);
  const offset = useTranslateFromOffscreen(wrapperRef, walkSpeed, async () => {
    setStatus('walk-sit-transition');
  });

  const handleMouseEnter = () => {
    if (status === 'walking') {
      // Ignore events during the initial intro stage
      return;
    }

    if (status === 'sitting') {
      // After X seconds, a sitting cat will lie down after the mouse leaves.
      // If the mouse re-enters, we should reset that timer, so that the cat
      // doesn't decide to nap while the user is reading the tooltip.
      window.clearTimeout(timeoutId.current);
    }
  };

  const handleMouseLeave = async () => {
    if (status === 'walking') {
      // Ignore events during the initial intro stage
      return;
    }

    if (status === 'sitting' && !hasSeenTooltip) {
      // A little bit after the user finishes with the tooltip, we want the
      // cat to relax a bit

      timeoutId.current = window.setTimeout(() => {
        setHasSeenTooltip(true);
        setStatus('sit-lie-transition');
      }, 3000);
    }
  };

  React.useEffect(
    () => {
      switch (status) {
        case 'walk-sit-transition': {
          timeoutId.current = window.setTimeout(() => {
            setStatus('sitting');
          }, 200);
          break;
        }

        case 'sit-lie-transition': {
          timeoutId.current = window.setTimeout(() => {
            setStatus('lying-awake');
          }, 200);
          break;
        }

        case 'lying-awake': {
          timeoutId.current = window.setTimeout(() => {
            setStatus('lying-asleep');
          }, 6000);
          break;
        }
      }
    },
    [status]
  );

  return (
    <Wrapper
      ref={wrapperRef}
      target="_blank"
      href={PATREON_URL}
      style={{ transform: `translateX(${offset}px)` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Tooltip
        animation="fade"
        duration={200}
        distance={-10}
        tabIndex={0}
        animateFill={false}
        followCursor={false}
        interactive={true}
        arrow={true}
        hideDelay={500}
        html={
          <>
            Enjoying Tinkersynth? Support its creator{' '}
            <PatreonTooltipLink href={PATREON_URL} target="_blank">
              on Patreon
            </PatreonTooltipLink>
            !
          </>
        }
        disabled={status === 'walking'}
        style={{
          lineHeight: 1.4,
        }}
      >
        <Cat status={status} />
      </Tooltip>
    </Wrapper>
  );
};

const Wrapper = styled.a`
  display: block;

  @media (max-width: 1024px) {
    /* Don't show the cat when the machines are stacked */
    display: none;
  }
`;

const PatreonTooltipLink = styled.a`
  color: white;
  font-weight: bold;
`;

export default SlopesCat;
