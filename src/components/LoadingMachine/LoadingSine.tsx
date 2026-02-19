import React from 'react';

import useToggle from '../../hooks/toggle.hook';
import { random, range, normalize } from '../../utils';

const RESOLUTION = 2;

const useOscillation = (totalWidth, totalHeight) => {
  const padding = 8;
  const left = padding;
  const top = padding;
  const innerWidth = totalWidth - padding * 2;
  const innerHeight = totalHeight - padding * 2;

  const numOfPoints = innerWidth / RESOLUTION;

  const maxVal = 3 * Math.PI;

  const [offset, setOffset] = React.useState(0);

  // Speed in hertz: how many times should the wave cycle per second?
  const speed = 1;

  React.useEffect(() => {
    let animationFrameId;
    let lastTickAt = performance.now();

    const tick = () => {
      const now = performance.now();

      const timeDelta = (now - lastTickAt) / 1000;

      setOffset(offset + timeDelta / (1 / speed));

      animationFrameId = window.requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const points = range(numOfPoints).map(i => {
    const ratio = i / numOfPoints;
    const x = left + ratio * innerWidth;

    const y =
      top +
      innerHeight / 2 +
      Math.sin(normalize(ratio + offset, 0, 1, 0, maxVal)) * (innerHeight / 2);

    return [x, y];
  });

  return points;
};

const LoadingSine = ({ width = 48, height = 34 }) => {
  const [hasBegun, toggleBegun] = useToggle(false);

  const points = useOscillation(width, height);

  React.useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      toggleBegun();
    }, 900);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 34"
      fill="none"
      style={{ backfaceVisibility: 'hidden' }}
    >
      <rect width="48" height="34" rx="4" fill="#2B2B2B" />
      <polyline
        data-layer-name="sine-wave"
        points={points.map(p => p.join(',')).join(' ')}
        stroke="#32FF98"
        strokeWidth="2"
        strokeLinecap="round"
        style={{
          opacity: hasBegun ? 1 : 0,
          transition: 'opacity 350ms',
        }}
      />
    </svg>
  );
};

export default React.memo(LoadingSine);
