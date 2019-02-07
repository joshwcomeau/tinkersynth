// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

type Props = {
  // Unique identifier needed for gradient IDs.
  id: string,
  width: number,
  height: number,
  colors?: {
    tGradient: [string, string],
    sColor: string,
  },
};

const DEFAULT_COLORS = {
  tGradient: ['#F218BC', '#FF1AFF'],
  sColor: '#3C22E6',
};

const Logo = ({ id, width, height, colors = DEFAULT_COLORS }: Props) => {
  // Our logo features a rounded upside-down triangle, T.
  // Figma exports the full size of that triangle, without the rounded corners,
  // and so by default our logo has padding on the left and bottom sides.
  // This padding is 8px in the full 116x80 viewBox. I'm reducing the viewBox
  // to 108x72, and offsetting the contents by -8px horizontally, to remove
  // this.
  // TODO: Get better at Figma.
  const offsetAmount = -3;

  return (
    <Svg width={width} height={height} viewBox="0 0 43 28" fill="none">
      <g transform={`translate(${offsetAmount}, 0)`}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M45.1231 16.846L32.248 24.2794C33.2173 25.5372 34.5922 26.4984 36.2444 26.9411C40.2454 28.0132 44.358 25.6388 45.43 21.6378C45.8727 19.9856 45.7277 18.3143 45.1231 16.846ZM31.248 22.5474C30.6434 21.0791 30.4984 19.4078 30.9411 17.7556C32.0132 13.7546 36.1257 11.3802 40.1267 12.4523C41.779 12.895 43.1538 13.8562 44.1231 15.114L31.248 22.5474Z"
          fill={colors.sColor}
        />
        <path
          d="M22.5212 25.698C21.781 28.0456 17.8916 28.1368 17.0643 25.8184C15.7971 22.2671 14.2114 18.3668 12.4944 15.4146C10.2978 11.6378 6.61686 7.2304 3.81775 4.0981C2.43263 2.54811 3.52268 1.9282e-05 5.60139 1.94637e-05L33.9739 2.19441e-05C36.1102 2.21309e-05 37.1904 2.68615 35.7078 4.22415C32.731 7.31199 28.9224 11.6078 26.7357 15.4146C25.0706 18.3135 23.6345 22.1675 22.5212 25.698Z"
          fill={`url(#${id})`}
        />
        <defs>
          <linearGradient
            id={id}
            x1="20"
            y1="35.1219"
            x2="20"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={colors.tGradient[0]} />
            <stop offset="1" stopColor={colors.tGradient[1]} />
          </linearGradient>
        </defs>
      </g>
    </Svg>
  );
};

const Svg = styled.svg`
  display: block;
  position: relative;
`;

export default Logo;
