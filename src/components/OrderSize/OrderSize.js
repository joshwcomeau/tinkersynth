import React from 'react';
import styled from 'styled-components';

import { COLORS, UNIT } from '../../constants';
import { calculateCost } from '../../helpers/store.helpers';

import RadioListSelect from '../RadioListSelect';
import Heading from '../Heading';
import Spacer from '../Spacer';
import Paragraph from '../Paragraph';

const OrderFormat = ({ size, handleChangeSize }) => {
  return (
    <Wrapper>
      <RadioListSelect
        name="order-size"
        selectedOptionId={size}
        handleSelect={handleChangeSize}
      >
        <RadioListSelect.Option id="small">
          <Title size={4}>12” × 18”</Title>
        </RadioListSelect.Option>

        <RadioListSelect.Option id="medium">
          <Title size={4}>18” × 24”</Title>
        </RadioListSelect.Option>

        <RadioListSelect.Option id="large">
          <Title size={4}>24” × 36”</Title>
        </RadioListSelect.Option>
      </RadioListSelect>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: 10px;
`;

const Title = styled(Heading)`
  font-size: 18px;
`;

export default OrderFormat;
