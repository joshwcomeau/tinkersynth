import React from 'react';
import Helmet from 'react-helmet';
import uuid from 'uuid';

import LayoutSidePage from '../../../components/LayoutSidePage';
import Purchase from '../../../server/email-templates/purchase-just-physical';
const templateProps = {
  format: 'vector',
  name: 'Josh Comeau',
  orderId: 5,
  svgUrl: 'https://placekitten.com/200/200',
  pngUrlTransparent: 'https://placekitten.com/200/300',
  pngUrlOpaque: 'https://placekitten.com/200/400',
};

const PurchasePrint = () => (
  <>
    <Helmet
      meta={[
        {
          name: 'robots',
          content: 'noindex',
        },
      ]}
    />

    <Purchase {...templateProps} />
  </>
);

export default PurchasePrint;
