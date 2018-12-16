// @flow
import React from 'react';

type Props = {
  size?: number,
};

const Screw = ({ size = 7 }: Props) => (
  <svg width={size} height={size} viewBox="0 0 7 7" fill="none">
    <circle cx="3.5" cy="3.5" r="3.5" fill="url(#screw-gradient)" />
    <line
      x1="4.20708"
      y1="4.20709"
      x2="2.79286"
      y2="2.79288"
      stroke="#9D9D9D"
      strokeLinecap="round"
    />
    <line
      x1="2.79291"
      y1="4.20708"
      x2="4.20712"
      y2="2.79286"
      stroke="#9D9D9D"
      strokeLinecap="round"
    />
    <defs>
      <radialGradient
        id="screw-gradient"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(3.5 3.5) rotate(90) scale(3.5)"
      >
        <stop stopColor="#EAEAEA" />
        <stop offset="1" stopColor="#DFDFDF" />
      </radialGradient>
    </defs>
  </svg>
);

export default Screw;
