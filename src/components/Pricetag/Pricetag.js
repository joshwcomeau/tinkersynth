// @flow
import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants';

type Props = {
  cost: number,
};

// HACK: I'm assuming all pricetags are round numbers, so I can just append
// zero cents.
const formatCost = number => `${number}.00`;

const Pricetag = ({ cost }: Props) => {
  return (
    <Wrapper>
      <DollarSign>$</DollarSign>
      <Cost>{formatCost(cost)}</Cost> <Currency>USD</Currency>
    </Wrapper>
  );
};

const Wrapper = styled.span`
  font-size: 24px;
  line-height: 32px;
  color: ${COLORS.gray[900]};
`;

const DollarSign = styled.span`
  font-size: 60%;
  font-weight: 400;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
  top: -0.5em;
`;

const Cost = styled.span`
  font-size: 24px;

  font-weight: 600;
`;

const Currency = styled.span`
  font-size: 18px;
`;

export default Pricetag;
