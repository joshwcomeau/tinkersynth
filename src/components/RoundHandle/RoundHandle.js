// @flow
import React from 'react';

import { COLORS } from '../../constants';

import Svg from '../Svg';

type Props = {
  id: string,
  size: number,
  innerColor?: string,
  outerColor?: string,
};

const RoundHandle = ({
  // If this handle should have different colours, it needs to provide a custom
  // ID, to use for the gradient filters.
  id = 'round',
  size,
  innerColor = COLORS.pink[300],
  outerColor = COLORS.pink[500],
}: Props) => (
  <Svg
    height={size}
    viewBox="0 0 22 22"
    fill="none"
    style={{ display: 'block' }}
  >
    <circle cx="11.2272" cy="11.4802" r="10" fill="#000000" fillOpacity="0.4" />
    <circle cx="10" cy="10" r="10" fill={`url(#${id}-handle-0)`} />
    <circle
      cx="9.5"
      cy="8.5"
      r="7.5"
      fill={`url(#${id}-handle-1)`}
      fillOpacity="0.5"
    />
    <circle
      cx="10"
      cy="10"
      r="10"
      transform="rotate(-90 10 10)"
      fill={`url(#${id}-handle-2)`}
      fillOpacity="0.5"
    />
    <defs>
      <radialGradient
        id={`${id}-handle-0`}
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(10 10) rotate(90) scale(10)"
      >
        <stop stopColor={innerColor} />
        <stop offset="1" stopColor={outerColor} />
      </radialGradient>

      <linearGradient
        id={`${id}-handle-1`}
        x1="4.14286"
        y1="-0.730769"
        x2="11.3164"
        y2="10.9262"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="0.684545" stopColor="white" stopOpacity="0" />
      </linearGradient>

      <linearGradient
        id={`${id}-handle-2`}
        x1="6"
        y1="30.6667"
        x2="12.9067"
        y2="13.5586"
        gradientUnits="userSpaceOnUse"
      >
        <stop />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
    </defs>
  </Svg>
);

export default RoundHandle;
