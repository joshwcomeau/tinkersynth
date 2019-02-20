import React from 'react';
import styled from 'styled-components';

import { COLORS, UNIT } from '../../constants';

import Heading from '../Heading';
import Paragraph from '../Paragraph';

const Column = ({ index, header, description, children }) => (
  <Wrapper>
    <Title size={4}>
      {index}. {header}
    </Title>

    <ChildWrapper>{children}</ChildWrapper>

    <Details>{description}</Details>
  </Wrapper>
);

const Wrapper = styled.div`
  flex: 1;
  color: ${COLORS.white};
`;

const Title = styled(Heading)`
  margin-bottom: ${UNIT * 2}px;
`;

const Details = styled(Paragraph)`
  font-size: 16px;
`;

const ChildWrapper = styled.div`
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.08);
`;

export default Column;
