// @flow
import React from 'react';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../constants';

type Props = {
  size: 1 | 2 | 3 | 4 | 5,
  children: React$Node,
};

const getElementForSize = size => {
  // prettier-ignore
  switch (size) {
    case 1: return H1;
    case 2: return H2;
    case 3: return H3;
    case 4: return H4;
    case 5: return H5;
    default: throw new Error('Unrecognized size: ' + size);
  }
};

const Heading = ({ size, children, ...delegated }: Props) => {
  const Component = getElementForSize(size);

  return <Component {...delegated}>{children}</Component>;
};

const H1 = styled.h1`
  font-size: 72px;
  font-weight: 700;
  letter-spacing: -3px;
  transform: translateX(-5px);

  @media ${BREAKPOINTS.sm} {
    font-size: 60px;
  }
`;
const H2 = styled.h1`
  font-size: 48px;
  font-weight: 700;
`;
const H3 = styled.h1`
  font-size: 36px;
  font-weight: 600;
`;
const H4 = styled.h1`
  font-size: 24px;
  font-weight: 600;
`;
const H5 = styled.h1`
  font-size: 20px;
  font-weight: 600;
`;

export default Heading;
