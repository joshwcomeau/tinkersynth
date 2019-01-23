// @flow
import React from 'react';
import styled from 'styled-components';

type Props = {
  size: 1 | 2 | 3 | 4,
  children: React$Node,
};

const getElementForSize = size => {
  // prettier-ignore
  switch (size) {
    case 1: return H1;
    case 2: return H2;
    case 3: return H3;
    case 4: return H4;
    default: throw new Error('Unrecognized size: ' + size);
  }
};

const Heading = ({ size, children }: Props) => {
  const Component = getElementForSize(size);

  return <Component>{children}</Component>;
};

const H1 = styled.h1`
  font-size: 60px;
  font-weight: 900;
  letter-spacing: -1px;
`;
const H2 = styled.h1`
  font-size: 48px;
  font-weight: 700;
`;
const H3 = styled.h1`
  font-size: 32px;
  font-weight: 600;
`;
const H4 = styled.h1`
  font-size: 24px;
  font-weight: 600;
`;

export default Heading;
