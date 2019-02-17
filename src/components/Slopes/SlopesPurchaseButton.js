// @flow
import React from 'react';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';
import queryString from 'query-string';
import styled from 'styled-components';
import Icon from 'react-icons-kit';
import { loader } from 'react-icons-kit/feather/loader';
import { check } from 'react-icons-kit/feather/check';

import { COLORS } from '../../constants';
import { getCost } from '../../reducers/store.reducer';
import { createStripeConnection } from '../../helpers/stripe.helpers';
import { submitCharge } from '../../helpers/api.helpers';
import analytics from '../../services/analytics.service';

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
    SUBMIT: 'preauthorizing',
  },
  preauthorizing: {
    SUCCESS: 'success',
  },
  success: {
    // End state. User will be redirected at this point.
  },
};

let stripe;

const SlopesPurchaseButton = ({ artParams, storeData, cost }: Props) => {
  const [status, setStatus] = React.useState('idle');
  const [canPurchase, setCanPurchase] = React.useState(true);

  const transition = (status, action) => {
    const nextStateKey = purchaseMachine[status][action];

    setStatus(nextStateKey);
  };

  const handleSuccessfulPurchase = ({ previewUrl, width, height }) => {
    // Whatever, the state machine is being problematic so I'm just setting it
    // directly.
    setStatus('success');

    analytics.logEvent('complete-checkout', { machineName: 'slopes' });

    window.setTimeout(() => {
      const urlParams = queryString.stringify({ previewUrl, width, height });
      navigate(`/thanks?${urlParams}`);
    }, 500);
  };

  const handleFailedPurchase = ({ err }) => {
    analytics.logEvent('error-checkout', { machineName: 'slopes', err });
  };

  React.useEffect(() => {
    try {
      stripe = createStripeConnection();
    } catch (err) {
      setCanPurchase(false);
      console.error('Could not load Stripe', err);
    }
  }, []);

  const openStripe = () => {
    analytics.logEvent('initiate-checkout', { machineName: 'slopes' });

    const productName =
      storeData.format === 'print' ? 'Art print' : 'Art download';

    stripe.open({
      name: 'Tinkersynth',
      description: productName,
      currency: 'usd',
      zipCode: true,
      billingAddress: true,
      shippingAddress: storeData.format === 'print',
      amount: cost,
      token: (token, addressData) => {
        const data = {
          artParams,
          addressData,
          format: storeData.format,
          size: storeData.size,
          cost,
          token,
        };

        transition(status, 'SUBMIT');

        submitCharge(data)
          .then(handleSuccessfulPurchase)
          .catch(handleFailedPurchase);
      },
    });
  };

  return (
    <Button
      size="large"
      color={status === 'success' ? COLORS.green[500] : COLORS.blue[500]}
      kind="flat"
      disabled={status === 'preauthorizing'}
      onClick={openStripe}
    >
      {status === 'idle' && 'Purchase'}

      {status === 'preauthorizing' && (
        <Spin>
          <Icon icon={loader} />
        </Spin>
      )}

      {status === 'success' && <Icon icon={check} />}
    </Button>
  );
};

const SlopesPurchaseButtonContainer = ({ storeData, cost }) => {
  const slopesParams = React.useContext(SlopesContext);

  const artParams = { ...slopesParams };
  delete artParams.isPoweredOn;
  delete artParams.shuffle;
  delete artParams.toggleMachinePower;
  delete artParams.toggleParameter;
  delete artParams.tweakParameter;

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
