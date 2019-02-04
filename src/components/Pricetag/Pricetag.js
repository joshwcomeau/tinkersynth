// @flow
import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants';

type Props = {
  cost: number,
};

const formatCost = number => {
  const dollars = number / 100;
  let cents = String(number % 100);

  if (cents.length === 1) {
    cents = `${cents}0`;
  }

  return `${dollars}.${cents}`;
};

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
