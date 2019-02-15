// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS, BREAKPOINTS } from '../../constants';

import Heading from '../Heading';

type Option = {
  label: string,
  id: string,
};

type Props = {
  title?: string,
  subtitle?: string,
  children: React$Node,
};

const StorefrontRow = ({ title, subtitle, children }: Props) => {
  return (
    <Wrapper>
      <TitleCell>
        {title && <Title size={4}>{title}</Title>}
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </TitleCell>

      <ChildrenCell>{children}</ChildrenCell>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const TitleCell = styled.div`
  width: 270px;
  color: ${COLORS.gray[900]};

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const Title = styled(Heading)`
  line-height: 32px;
`;

const Subtitle = styled.div`
  font-size: 14px;
  font-weight: 300;
  color: ${COLORS.gray[700]};
`;

const ChildrenCell = styled.div`
  flex: 1;
`;

export default StorefrontRow;
