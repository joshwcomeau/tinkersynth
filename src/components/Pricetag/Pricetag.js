// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS, UNIT } from '../../constants';

import FadeOnChange from '../FadeOnChange';
import Spacer from '../Spacer';

type Props = {
  cost: number,
  includeShippingNote: boolean,
};

const Pricetag = ({ cost, includePrefix, includeShippingNote }: Props) => {
  const dollars = cost / 100;

  return (
    <Wrapper>
      {includePrefix && <Prefix>Total: </Prefix>}
      <Cost>{dollars}</Cost> <Currency>USD</Currency>
      {includeShippingNote && (
        <ShippingNote>
          Includes <strong>free worldwide shipping</strong>.
        </ShippingNote>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.span`
  font-size: 21px;
  line-height: 32px;
  color: ${COLORS.gray[900]};
`;

const Prefix = styled.span``;

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
