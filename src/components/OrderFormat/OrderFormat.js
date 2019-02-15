import React from 'react';
import styled from 'styled-components';

import { COLORS, UNIT } from '../../constants';

import CardToggle from '../CardToggle';
import Heading from '../Heading';
import Paragraph from '../Paragraph';

const Pricing = ({ price, variable }) => {
  return (
    <PricingWrapper>
      {variable && <PricingSubheading>Starting from</PricingSubheading>}
      <PricingValue>
        <strong>{price}</strong> USD
      </PricingValue>
    </PricingWrapper>
  );
};

const OrderFormat = ({ format, handleChangeFormat }) => {
  return (
    <Wrapper>
      <CardToggle selectedOptionId={format} handleToggle={handleChangeFormat}>
        <CardToggle.Option id="print">
          <Column>
            <Main>
              <Title size={4}>Source Image</Title>
              <Details>
                Receive a download pack which includes the source SVG as well as
                several print-ready raster images.
              </Details>
            </Main>

            <Pricing price={19} variable={false} />
          </Column>
        </CardToggle.Option>
        <CardToggle.Option id="vector">
          <Column>
            <Main>
              <Title size={4}>Giclée Print</Title>
              <Details>
                Ultra-premium lustre print on 240gsm acid-free paper. Printed
                with archival inks.
              </Details>
            </Main>

            <Pricing price={99} variable={true} />
          </Column>
        </CardToggle.Option>
        <CardToggle.Option id="combo">
          <Column>
            <Main>
              <Title size={4}>Source + Giclée</Title>
              <Details>
                Combination pack. Download plus ultra-premium Giclée print.
              </Details>
            </Main>

            <Pricing price={99} variable={true} />
          </Column>
        </CardToggle.Option>
      </CardToggle>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-left: -${UNIT * 2}px;
  margin-right: -40px;
`;

const Title = styled(Heading)`
  font-size: 21px;
  margin: ${UNIT}px 0 ${UNIT * 2}px;
`;

const Details = styled(Paragraph)`
  font-size: 14px;
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
  height: 42px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

const PricingSubheading = styled.div`
  font-size: 12px;
  font-style: italic;
  color: ${COLORS.gray[500]};
  line-height: 22px;
`;

const PricingValue = styled.div`
  font-size: 18px;
`;

export default OrderFormat;
