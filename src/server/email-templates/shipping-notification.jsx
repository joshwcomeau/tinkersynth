/**
 * Ok so email is still stuck in 2003.
 * I'm in a hurry so this component will be a huge mess.
 */

import React from 'react';

import { COLORS } from '../../constants';

import Wrapper from './wrapper';

const getShippingInfo = (carrier, trackingNum) => {
  if (trackingNum) {
    return (
      <p>
        Your order was shipped with <strong>{carrier}</strong>, and the tracking
        number is <strong>{trackingNum}</strong>.
      </p>
    );
  }

  return (
    <p>
      Your order was shipped with <strong>{carrier}</strong>.
    </p>
  );
};

const ShippingNotification = ({ name, orderId, carrier, trackingNum }) => (
  <Wrapper>
    {name && <p>Hi {name}!</p>}

    <p>
      Your Tinkersynth order has been printed, and is in the hands of the mail
      carrier! You should receive it shortly.
    </p>

    {getShippingInfo(carrier, trackingNum)}

    <br />
    <br />
    <hr />

    <p>
      We really appreciate your purchase, and we hope it brings you a lot of
      joy.
    </p>

    <p>
      If you have any questions or comments, feel free to reply to this email.
    </p>

    <p
      style={{
        fontSize: 12,
        marginTop: 40,
        color: '#999',
        textAlign: 'center',
      }}
    >
      This email is in reference to Order #<em>{orderId}</em>.
    </p>
  </Wrapper>
);

export default ShippingNotification;
