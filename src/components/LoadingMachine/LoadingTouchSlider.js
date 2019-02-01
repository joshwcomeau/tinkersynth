// @flow

import React from 'react';
import { Spring } from 'react-spring';

import { range, random, normalize } from '../../utils';

const useBlinkingLights = (initialValue, maxNum) => {
  const [num, setNum] = React.useState(initialValue);

  React.useEffect(() => {
    let timeoutId;

    const update = () => {
      setNum(random(1, maxNum));

      timeoutId = window.setTimeout(update, random(700, 1000));
    };

    timeoutId = window.setTimeout(update, random(500, 2000));

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return num;
};

const getColorForCircle = index => {
  if (index < 6) {
    return '#1AD9FF';
  } else if (index < 12) {
    return '#32FF98';
  } else {
    return '#FFEB33';
  }
};

const springConfig = {
  tension: 40,
  friction: 6,
};

// HACK: the `width` and `height` need to be their default values, otherwise
// the circles won't render correctly.
const LoadingTouchSlider = ({ width = 52, height = 16, count = 16 }) => {
  const value = useBlinkingLights(0, 16);

  return (
    <svg width={width} height={height} viewBox="0 0 52 16" fill="none">
      <rect width="52" height="16" rx="4" fill="#2B2B2B" />

      <Spring to={{ num: value }} config={springConfig}>
        {interpolated => {
          const numToShow = Math.round(interpolated.num);

          return range(count).map(i => {
            const colIndex = Math.floor(i / 2); // 0, 0, 1, 1, 2, 2...
            const x = colIndex * 6 + 5; // 5, 5, 11, 11, 17, 17...

            const y = i % 2 === 0 ? 5 : 11;

            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={2}
                fill={getColorForCircle(i)}
                style={{
                  opacity: numToShow > i ? 1 : 0,
                }}
              />
            );
          });
        }}
      </Spring>
    </svg>
  );
};

export default LoadingTouchSlider;
