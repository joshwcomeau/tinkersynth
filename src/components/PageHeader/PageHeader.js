import React from 'react';
import styled from 'styled-components';

import { COLORS, UNIT } from '../../constants';

import Heading from '../Heading';

const PageHeader = ({ children }) => (
  <Wrapper>
    <Heading size={1}>{children}</Heading>

    <UnderlineSvg viewBox="0 0 200 15">
      <polygon
        points={`
          0,0
          200,0
          175,15
          0,15
        `}
        fill={COLORS.pink[500]}
        stroke={COLORS.pink[500]}
        strokeLinejoin="round"
        strokeWidth={4}
      />
    </UnderlineSvg>
  </Wrapper>
);

const Wrapper = styled.div`
  margin-bottom: ${UNIT * 8}px;
`;

const UnderlineSvg = styled.svg`
  display: block;
  width: 100px;
  margin-top: ${UNIT * 2}px;
`;

export default PageHeader;
