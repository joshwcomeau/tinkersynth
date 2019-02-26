import React from 'react';
import styled from 'styled-components';

import { COLORS, UNIT } from '../../constants';
import { calculateCost } from '../../helpers/store.helpers';

import RadioListSelect from '../RadioListSelect';
import Heading from '../Heading';
import Spacer from '../Spacer';
import Paragraph from '../Paragraph';

const OrderFormatItem = ({ title, details, price, variablePrice }) => (
  <>
    <Title size={4}>{title}</Title>
    <Spacer size={UNIT} />
    <Details>{details}</Details>
    <Spacer size={UNIT * 2} />
    <PricingWrapper>
      {variablePrice && <PricingSubheading>from&nbsp;</PricingSubheading>}
      <PricingValue>{price / 100}</PricingValue> USD
    </PricingWrapper>
  </>
);

const OrderFormat = ({ format, handleChangeFormat }) => {
  return (
    <Wrapper>
      <RadioListSelect
        name="order-format"
        selectedOptionId={format}
        handleSelect={handleChangeFormat}
      >
        <RadioListSelect.Option id="vector">
          <OrderFormatItem
            title="Vector and Raster Download"
            details="Digital delivery of print-ready image assets, including a  vector image (svg) and multiple 300dpi raster images (png)."
            price={calculateCost('vector')}
          />
        </RadioListSelect.Option>

        <RadioListSelect.Option id="print">
          <OrderFormatItem
            title="Fine Art Print"
            details={
              <>
                Giclée art print, printed on <em>Epson Ultra-Premium Lustre</em>{' '}
                paper, a 240gsm acid-free paper known for its rich blacks.
                Printed with archival inks.
              </>
            }
            price={calculateCost('print', 'small')}
            variablePrice
          />
        </RadioListSelect.Option>

        <RadioListSelect.Option id="combo">
          <OrderFormatItem
            title="Fine Art Print + Vector / Raster Download"
            details="Combo pack: receive the fine art print alongside digitally-delivered print-ready image assets."
            price={calculateCost('combo', 'small')}
            variablePrice
          />
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

const Details = styled(Paragraph)`
  font-size: 14px;
  color: ${COLORS.gray[700]};
  margin-bottom: 0;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const Main = styled.div`
  text-align: center;
`;

const PricingWrapper = styled.div`
  font-size: 14px;
  color: ${COLORS.gray[900]};
`;

const PricingSubheading = styled.span``;

const PricingValue = styled.strong`
  font-weight: bold;
  font-size: 15px;
  color: ${COLORS.black};
`;

export default OrderFormat;
