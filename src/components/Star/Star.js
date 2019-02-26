// @flow
import React from 'react';
import styled from 'styled-components';

import Svg from '../Svg';

type Props = {
  size?: number,
  color?: string,
  top?: number,
  left?: number,
};

const Star = ({ size = 18, color = '#FFEB33', top = 0, left = 0 }: Props) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18">
      <path
        d="M9 1L11.3511 5.76393L16.6085 6.52786L12.8042 10.2361L13.7023 15.4721L9 13L4.29772 15.4721L5.19577 10.2361L1.39155 6.52786L6.64886 5.76393L9 1Z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

const Wrapper = styled.div`
  position: absolute;
`;

export default Star;
