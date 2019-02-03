// @flow
import React from 'react';
import styled from 'styled-components';
import Icon from 'react-icons-kit';
import { loader } from 'react-icons-kit/feather/loader';

import { COLORS } from '../../constants';

import Button from '../Button';
import Spin from '../Spin';
import { SlopesContext } from './SlopesState';

type Props = {};

const purchaseMachine = {
  idle: {
    CLICK: 'purchasing',
  },
  purchasing: {
    SUCCESS: 'idle',
    FAILURE: 'idle',
  },
};

const handler = StripeCheckout.configure({
  key: 'pk_test_gDdRrVU2WlqLzp2lN9W4JppB',
  image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
  locale: 'auto',
  token: function(token, args) {
    console.log({ token, args });
    // You can access the token ID with `token.id`.
    // Get the token ID to your server-side code for use.
  },
});

const SlopesPurchaseButton = ({ params }: Props) => {
  const [status, setStatus] = React.useState('idle');

  const transition = action => {
    const nextStateKey = purchaseMachine[status][action];

    setStatus(nextStateKey);

    // Manage side-effects
    if (nextStateKey === 'purchasing') {
      const slopesData = { ...params };
      delete slopesData.disabledParams;
      delete slopesData.isShuffled;

      handler.open({
        name: 'Tinkersynth',
        description: 'Custom Art',
        zipCode: true,
        currency: 'usd',
        shippingAddress: true,
        amount: 2000,
        closed: () => {
          transition('SUCCESS');
        },
      });

      // window
      //   .fetch('http://localhost:1337/purchase/create-session', {
      //     method: 'POST',
      //     mode: 'cors',
      //     cache: 'no-cache',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       // "Content-Type": "application/x-www-form-urlencoded",
      //     },
      //     body: JSON.stringify(slopesData),
      //   })
      //   .then(response => response.json())
      //   .then(data => {
      //     console.log('Got response', data);

      //   });
    }
  };

  return (
    <Button
      size="large"
      color={COLORS.blue[500]}
      style={{ width: 100 }}
      disabled={status !== 'idle'}
      onClick={() => transition('CLICK')}
    >
      {status === 'purchasing' ? (
        <Spin>
          <Icon
            icon={loader}
            style={{ display: 'block', verticalAlign: 'initial' }}
          />
        </Spin>
      ) : (
        'Purchase'
      )}
    </Button>
  );
};

const SlopesPurchaseButtonContainer = () => {
  const slopesParams = React.useContext(SlopesContext);

  return <SlopesPurchaseButton params={slopesParams} />;
};

export default SlopesPurchaseButtonContainer;
