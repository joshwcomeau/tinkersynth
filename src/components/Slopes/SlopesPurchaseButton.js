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
    CLICK: 'generatingSession',
  },
  generatingSession: {
    SESSION_SUCCESS: 'checkout',
    SESSION_FAILURE: 'idle',
  },
  checkout: {
    // Final state
  },
};

const SlopesPurchaseButton = ({ params }: Props) => {
  const [status, setStatus] = React.useState('idle');

  const transition = action => {
    const nextStateKey = purchaseMachine[status][action];

    setStatus(nextStateKey);

    // Manage side-effects
    if (nextStateKey === 'generatingSession') {
      const slopesData = { ...params };
      delete slopesData.disabledParams;
      delete slopesData.isShuffled;

      console.log({ slopesData });

      window
        .fetch('http://localhost:1337/purchase/create-session', {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
            // "Content-Type": "application/x-www-form-urlencoded",
          },
          body: JSON.stringify(slopesData),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Got response', data);
        });
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
      {status === 'generatingSession' ? (
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
