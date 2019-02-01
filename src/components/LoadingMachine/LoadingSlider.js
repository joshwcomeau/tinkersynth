import React from 'react';
import { useSpring, animated } from 'react-spring/hooks';

import { random, range, normalize } from '../../utils';

import Svg from '../Svg';

const LoadingSlider = ({ width = 20, height = 52 }) => {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    let timeoutId;

    const update = () => {
      setValue(random(0, 100));

      timeoutId = window.setTimeout(update, random(500, 1000));
    };

    timeoutId = window.setTimeout(update, random(1000, 2500));

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  const spring = useSpring({
    value,
  });

  return (
    <Svg width={width} height={height} viewBox="0 0 20 52" fill="none">
      <rect x="2" width="16" height="52" rx="4" fill="#2B2B2B" />
      <line
        x1="6"
        y1="5"
        x2="14"
        y2="5"
        stroke="#fff"
        strokeOpacity="0.51"
        strokeWidth="2"
      />
      <line
        x1="6"
        y1="11"
        x2="14"
        y2="11"
        stroke="#fff"
        strokeOpacity="0.51"
        strokeWidth="2"
      />
      <line
        x1="6"
        y1="17"
        x2="14"
        y2="17"
        stroke="#fff"
        strokeOpacity="0.51"
        strokeWidth="2"
      />
      <line
        x1="6"
        y1="23"
        x2="14"
        y2="23"
        stroke="#fff"
        strokeOpacity="0.51"
        strokeWidth="2"
      />
      <line
        x1="6"
        y1="29"
        x2="14"
        y2="29"
        stroke="#fff"
        strokeOpacity="0.51"
        strokeWidth="2"
      />
      <line
        x1="6"
        y1="35"
        x2="14"
        y2="35"
        stroke="#fff"
        strokeOpacity="0.51"
        strokeWidth="2"
      />
      <line
        x1="6"
        y1="41"
        x2="14"
        y2="41"
        stroke="#fff"
        strokeOpacity="0.51"
        strokeWidth="2"
      />
      <line
        x1="6"
        y1="47"
        x2="14"
        y2="47"
        stroke="#fff"
        strokeOpacity="0.51"
        strokeWidth="2"
      />
      <animated.rect
        y={height - 8}
        width="20"
        height="8"
        rx="4"
        fill="#FF27FF"
        style={{
          transform: spring.value.interpolate(
            val => `translateY(${normalize(val, 0, 100, 4, -height + 4)}px)`
          ),
        }}
      />
    </Svg>
  );
};

export default LoadingSlider;
