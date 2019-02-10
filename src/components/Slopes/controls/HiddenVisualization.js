import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring/hooks';

import { COLORS } from '../../../constants';
import { sample } from '../../../utils';

const HiddenVisualization = ({ width, height, isEnabled }) => {
  const [rotate, setRotate] = React.useState(0);

  React.useEffect(
    () => {
      let timeoutId;

      setRotate(isEnabled ? sample([-20, -15, -10, 10, 15, 20]) : 0);

      if (isEnabled) {
        timeoutId = window.setTimeout(() => {
          setRotate(0);
        }, 250);
      }

      return () => {
        window.clearTimeout(timeoutId);
      };
    },
    [isEnabled]
  );

  const spring = useSpring({
    transform: `rotate(${rotate}deg)`,
    config: {
      tension: 80,
      friction: 2,
    },
  });

  return (
    <animated.svg
      width="22"
      height="27"
      viewBox="0 0 22 27"
      fill="none"
      style={{ transform: spring.transform, transformOrigin: 'bottom center' }}
    >
      <path
        data-layer-name="White egg"
        d="M11.0283 0.740296C5.05355 0.189355 1.50815 11.4112 1.68468 14.9423C1.94811 20.2115 5.44904 25.7481 10.7243 25.8183C16.7894 25.899 19.9582 22.2058 20.1524 16.1432C20.2968 11.6374 16.505 1.24531 11.0283 0.740296Z"
        fill="white"
      />
      {isEnabled && (
        <g data-layer-name="Coloured stripes">
          <mask
            id="hidden-viz-mask"
            mask-type="alpha"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="22"
            height="27"
          >
            <path
              data-layer-name="Vector 2.2"
              d="M11.0282 0.740296C5.05351 0.189355 1.50811 11.4112 1.68465 14.9423C1.94807 20.2115 5.44901 25.7481 10.7242 25.8183C16.7894 25.899 19.9582 22.2058 20.1524 16.1432C20.2967 11.6374 16.5049 1.24531 11.0282 0.740296Z"
              fill="white"
            />
          </mask>
          <g mask="url(#hidden-viz-mask)">
            <path
              d="M-4.5 13L23 2.51724V-6L-6 4.81034L-4.5 13Z"
              fill="#F578F5"
            />
            <path
              d="M-1.5 18L26 7.51724V-1L-3 9.81034L-1.5 18Z"
              fill="#F9DD7B"
            />
            <path
              d="M-1.5 25L26 14.5172V6L-3 16.8103L-1.5 25Z"
              fill="#6CDDF4"
            />
            <path
              d="M-1.5 32L26 21.5172V13L-3 23.8103L-1.5 32Z"
              fill="#FB8773"
            />
          </g>
        </g>
      )}
    </animated.svg>
  );
};

export default HiddenVisualization;
