// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Icon from 'react-icons-kit';
import { loader } from 'react-icons-kit/feather/loader';

import { COLORS } from '../../constants';
import { getCost } from '../../reducers/store.reducer';
import { createStripeConnection } from '../../helpers/stripe.helpers';
import { submitCharge } from '../../helpers/api.helpers';

import Button from '../Button';
import Spin from '../Spin';
import { SlopesContext } from './SlopesState';

type Props = {
  // Lazy AF
  artParams: any,
  storeData: any,
  cost: number,
};

const purchaseMachine = {
  idle: {
    SUBMIT: 'purchasing',
  },
  purchasing: {
    SUCCESS: 'idle',
    FAILURE: 'idle', // TODO
  },
  success: {
    FINISHED: 'idle',
  },
};

let stripe;

const SlopesPurchaseButton = ({ artParams, storeData, cost }: Props) => {
  const [status, setStatus] = React.useState('idle');
  const [canPurchase, setCanPurchase] = React.useState(true);

  React.useEffect(() => {
    try {
      stripe = createStripeConnection();
    } catch (err) {
      setCanPurchase(false);
      console.error('Could not load Stripe', err);
    }
  }, []);

  const transition = action => {
    const nextStateKey = purchaseMachine[status][action];

    setStatus(nextStateKey);
  };

  const openStripe = () => {
    const productName =
      storeData.format === 'print' ? 'Art print' : 'Art download';

    stripe.open({
      name: 'Tinkersynth',
      description: productName,
      currency: 'usd',
      zipCode: true,
      billingAddress: true,
      shippingAddress: true,
      amount: cost,
      token: (token, args) => {
        const body = {
          artParams,
          format: storeData.format,
          size: storeData.size,
          cost,
          token,
        };
        setStatus('SUBMIT');

        submitCharge(body).then(args => {
          console.log('response', args);
        });
      },
    });
  };

  return (
    <Button
      size="large"
      color={COLORS.blue[500]}
      style={{ width: 85 }}
      disabled={status !== 'idle'}
      onClick={openStripe}
    >
      {status === 'purchasing' ? (
        <Spin>
          <Icon icon={loader} />
        </Spin>
      ) : (
        'Purchase'
      )}
    </Button>
  );
};

const SlopesPurchaseButtonContainer = ({ storeData, cost }) => {
  const slopesParams = React.useContext(SlopesContext);

  const artParams = { ...slopesParams };
  delete artParams.disabledParams;
  delete artParams.isShuffled;

  return (
    <SlopesPurchaseButton
      artParams={artParams}
      storeData={storeData}
      cost={cost}
    />
  );
};

const mapStateToProps = state => ({
  storeData: state.store.slopes,
  cost: getCost('slopes')(state),
});

export default connect(mapStateToProps)(SlopesPurchaseButtonContainer);
