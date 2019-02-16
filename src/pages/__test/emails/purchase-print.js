import React from 'react';
import Helmet from 'react-helmet';

import LayoutSidePage from '../../../components/LayoutSidePage';
import Purchase from '../../../server/email-templates/purchase';

const templateProps = {
  format: 'print',
  name: 'Josh Comeau',
  svgUrl: 'https://placekitten.com/200/200',
  pngUrlTransparent: 'https://placekitten.com/200/300',
  pngUrlOpaque: 'https://placekitten.com/200/400',
};

const PurchasePrint = () => (
  <LayoutSidePage>
    <Helmet
      meta={[
        {
          name: 'robots',
          content: 'noindex',
        },
      ]}
    />

    <Purchase {...templateProps} />
  </LayoutSidePage>
);

export default PurchasePrint;
