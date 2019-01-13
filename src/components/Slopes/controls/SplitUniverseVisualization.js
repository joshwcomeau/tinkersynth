// @flow
import React, { useEffect, useState, useRef } from 'react';

import { normalize, clamp } from '../../../utils';

import Svg from '../../Svg';
import { useSpring, animated } from 'react-spring/hooks';

type Props = {
  size: number,
  value: number,
  isAnimated: boolean,
};

const springConfig = {
  tension: 120,
  friction: 7,
};

const SPLIT_WITHIN = 0.2;

const getWithinRange = (ratio, from, to) => {
  const minMaxArr = [from, to].sort();
  return clamp(normalize(ratio, SPLIT_WITHIN, 1, from, to), ...minMaxArr);
};

const SplitUniverseVisualization = ({ size, value, isAnimated }: Props) => {
  const ratio = value / 100;

  const spring = useSpring({
    ratio,
    config: springConfig,
    immediate: !isAnimated,
  });

  const tearNode = useRef(null);
  const [tearPathLength, setTearPathLength] = useState(null);

  useEffect(() => {
    if (!tearNode.current) {
      return;
    }

    setTearPathLength(tearNode.current.getTotalLength());
  }, []);

  let tearNodeDashOffset = tearPathLength
    ? tearPathLength - normalize(ratio, 0, SPLIT_WITHIN, 0, tearPathLength)
    : 0;

  tearNodeDashOffset = clamp(tearNodeDashOffset, 0, tearPathLength);

  return (
    <Svg width={size} height={size} viewBox="0 0 40 40">
      <mask
        id="split-uni-mask-0"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="18"
        y="3"
        width="22"
        height="34"
      >
        <path
          d="M18.125 10.625L21.25 6.25L22.5 3.75L38.125 10L40 30.625L31.875 36.25L27.5 30L21.875 26.875L25 22.5L20 18.125L24.375 13.75L18.125 10.625Z"
          fill="#C4C4C4"
        />
      </mask>
      <mask
        id="split-uni-mask-1"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="10"
        y="10"
        width="20"
        height="20"
      >
        <circle cx="20" cy="20" r="10" fill="#C4C4C4" />
      </mask>
      <mask
        id="split-uni-mask-2"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="1"
        y="3"
        width="33"
        height="36"
      >
        <path
          d="M18.125 10.625L20.625 7.5L24.375 3.125L3.125 5.625L1.875 17.5L3.75 28.125L10.625 32.5L16.875 36.875C18.75 37.2917 22.625 38.125 23.125 38.125C23.625 38.125 32.5 33.3333 33.75 33.125L27.5 30L21.875 26.875L25 22.5L20 18.125L24.375 13.75L18.125 10.625Z"
          fill="#C4C4C4"
        />
      </mask>

      <animated.g
        mask="url(#split-uni-mask-0)"
        transform={spring.ratio.interpolate(
          ratio => `
          translate(
            ${getWithinRange(ratio, 0, 30)},
            ${getWithinRange(ratio, 0, -10)})
          rotate(${getWithinRange(ratio, 0, 45)})
        `
        )}
      >
        <circle cx="20" cy="20" r="12.5" stroke="#1AD9FF" strokeWidth="2" />
        <g mask="url(#split-uni-mask-1)">
          <path
            d="M12.0833 20L7.5 14.375V11.25L10.119 10H14.0476L15.3571 13.125L17.9762 12.5L19.2857 15.625L16.6667 16.25L14.7024 19.375L18.631 20.625L21.25 23.125L18.631 26.25L15.3571 28.75L16.6667 24.375L14.7024 21.25L12.0833 20Z"
            stroke="#32FF98"
            strokeLinejoin="round"
          />
          <path
            d="M25.3452 21.25L26.25 18.75L28.75 17.5L31.25 18.125H33.75L35.625 21.875L36.875 25.625L34.375 28.75L31.25 28.125L29.375 23.125L27.5 23.75L25.3452 21.25Z"
            stroke="#32FF98"
            strokeLinejoin="round"
          />
          <path
            d="M26.25 15.625L27.5 13.125L26.25 9.375L29.375 10L37.5 12.5L32.5 16.25L30 15L26.25 15.625Z"
            stroke="#32FF98"
            strokeLinejoin="round"
          />
        </g>
        <path
          ref={node => (tearNode.current = node)}
          d="M20.625 7.5L18.125 10.625L24.375 13.75L20 18.125L25 22.5L21.875 26.875L27.5 30"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="square"
          strokeDasharray={tearPathLength}
          strokeDashoffset={tearNodeDashOffset}
        />
      </animated.g>

      <animated.g
        mask="url(#split-uni-mask-2)"
        transform={spring.ratio.interpolate(
          ratio => `
          translate(
            ${getWithinRange(ratio, 0, -20)},
            ${getWithinRange(ratio, 0, 20)})
          rotate(${getWithinRange(ratio, 0, -40)})
        `
        )}
      >
        <circle cx="20" cy="20" r="12.5" stroke="#1AD9FF" strokeWidth="2" />
        <mask
          id="split-uni-mask-3"
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x="10"
          y="10"
          width="20"
          height="20"
        >
          <circle cx="20" cy="20" r="10" fill="#C4C4C4" />
        </mask>
        <g mask="url(#split-uni-mask-3)">
          <path
            d="M12.0833 20L7.5 14.375V11.25L10.119 10H14.0476L15.3571 13.125L17.9762 12.5L19.2857 15.625L16.6667 16.25L14.7024 19.375L18.631 20.625L21.25 23.125L18.631 26.25L15.3571 28.75L16.6667 24.375L14.7024 21.25L12.0833 20Z"
            stroke="#32FF98"
            strokeLinejoin="round"
          />
          <path
            d="M25.3452 21.25L26.25 18.75L28.75 17.5L31.25 18.125H33.75L35.625 21.875L36.875 25.625L34.375 28.75L31.25 28.125L29.375 23.125L27.5 23.75L25.3452 21.25Z"
            stroke="#32FF98"
            strokeLinejoin="round"
          />
          <path
            d="M26.25 15.625L27.5 13.125L26.25 9.375L29.375 10L37.5 12.5L32.5 16.25L30 15L26.25 15.625Z"
            stroke="#32FF98"
            strokeLinejoin="round"
          />
        </g>
        <path
          d="M20.625 7.5L18.125 10.625L24.375 13.75L20 18.125L25 22.5L21.875 26.875L27.5 30"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="square"
          strokeDasharray={tearPathLength}
          strokeDashoffset={tearNodeDashOffset}
        />
      </animated.g>
    </Svg>
  );
};

export default SplitUniverseVisualization;
