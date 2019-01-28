// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

import Button from '../Button';

type Props = {};

const SlopesPurchaseButton = ({  }: Props) => {
  // TODO: Load Stripe if it isn't already available
  return (
    <Button size="large" color={COLORS.blue[500]}>
      Purchase
    </Button>
  );
};

export default SlopesPurchaseButton;
