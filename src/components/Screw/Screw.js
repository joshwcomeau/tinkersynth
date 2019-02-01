// @flow
import React from 'react';

import Svg from '../Svg';

type Props = {
  size?: number,
};

const Screw = ({ size = 5 }: Props) => (
  <Svg width={size} height={size} viewBox="0 0 5 5" fill="none">
    <circle cx="2.5" cy="2.5" r="2.5" fill="#E6E6E6" />
    <path
      d="M1.43932 1.43934L3.56064 3.56066M1.43932 3.56066L3.56064 1.43934"
      stroke="#666"
      strokeWidth="1"
    />
  </Svg>
);

export default Screw;
