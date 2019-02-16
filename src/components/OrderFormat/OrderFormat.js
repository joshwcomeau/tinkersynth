import React from 'react';
import styled from 'styled-components';

import { COLORS, UNIT } from '../../constants';

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
      <PricingValue>
        <strong>{price}</strong> USD
      </PricingValue>
    </PricingWrapper>
  </>
);

const OrderFormat = ({ format, handleChangeFormat }) => {
  return (
    <RadioListSelect
      name="order-format"
      selectedOptionId={format}
      handleSelect={handleChangeFormat}
    >
      <RadioListSelect.Option id="vector">
        <OrderFormatItem
          title="Vector and Raster Download"
          details="Digital delivery of print-ready image assets, including a scalable vector image (SVG) and multiple 300DPI raster images (PNG)."
          price={19}
        />
      </RadioListSelect.Option>

      <RadioListSelect.Option id="print">
        <OrderFormatItem
          title="Giclée Art Print"
          details={
            <>
              Fine art print, printed on{' '}
              <em style={{ fontStyle: 'normal' }}>
                Epson Ultra-Premium Lustre
              </em>{' '}
              paper, a 240gsm acid-free paper known for its rich blacks. Printed
              with archival inks.
            </>
          }
          price={99}
          variablePrice
        />
      </RadioListSelect.Option>

      <RadioListSelect.Option id="combo">
        <OrderFormatItem
          title="Giclée Art Print + Vector / Raster Download"
          details="Combo pack: receive the fine art print alongside digitally-delivered print-ready image assets."
          price={99}
          variablePrice
        />
      </RadioListSelect.Option>
    </RadioListSelect>
  );
};

const Title = styled(Heading)`
  font-size: 18px;
`;

const Details = styled(Paragraph)`
  font-size: 14px;
  font-style: italic;
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
  color: ${COLORS.gray[700]};
`;

const PricingSubheading = styled.span``;

const PricingValue = styled.span`
  font-weight: bold;
  color: ${COLORS.black};
`;

export default OrderFormat;
