import React from 'react';
import styled from 'styled-components';

import { COLORS, UNIT } from '../../constants';

const PageHeader = ({ children }) => (
  <Wrapper>
    <Title>{children}</Title>

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

const Title = styled.div`
  font-size: 60px;
  font-weight: bold;
  letter-spacing: -1px;
`;

const UnderlineSvg = styled.svg`
  display: block;
  width: 100px;
  margin-top: ${UNIT * 2}px;
`;

export default PageHeader;
