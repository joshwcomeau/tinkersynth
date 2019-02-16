// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS, UNIT } from '../../constants';

import FadeOnChange from '../FadeOnChange';
import Spacer from '../Spacer';

type Props = {
  cost: number,
};

const Pricetag = ({ cost }: Props) => {
  const dollars = cost / 100;

  return (
    <Wrapper>
      <Cost>{dollars}</Cost> <Currency>USD</Currency>
      <ShippingNote>
        Includes <strong>free worldwide shipping</strong>.
      </ShippingNote>
    </Wrapper>
  );
};

const Wrapper = styled.span`
  font-size: 21px;
  line-height: 32px;
  color: ${COLORS.gray[900]};
`;

const Cost = styled.span`
  font-weight: bold;
`;

const Currency = styled.span`
  font-size: 0.9em;
`;

const ShippingNote = styled.div`
  font-size: 14px;
`;

export default Pricetag;
