/**
 * Ok so email is still stuck in 2003.
 * I'm in a hurry so this component will be a huge mess.
 */

import React from 'react';

import { COLORS } from '../../constants';

import Wrapper from './wrapper';

const PurchaseJustPhysicalPrint = ({
  orderId,
  format,
  name,
  svgUrl,
  pngUrlTransparent,
  pngUrlOpaque,
}) => (
  <Wrapper>
    <p>Hi {name},</p>

    <p>
      Thanks so much for your purchase. Tinkersynth is a brand-new art
      experiment, and your support means a lot to us.
    </p>

    <p>
      We've successfully created the assets needed for printing your fine-art
      print. We'll get started on that shortly, and we expect to have it in the
      mail within 5 business days. For more information on shipping directions,
      check out the{' '}
      <a href="https://tinkersynth.com/faq?q=shipping-duration">FAQ</a>.
    </p>

    <br />

    <h4>Continue Working</h4>

    <p>
      Want to keep iterating on the design you came up with for this print? This
      special link will initialize the machine to the settings used for this
      order, so you can always pick up from where you left off with your order:
    </p>

    <a href={`https://tinkersynth.com/slopes?orderId=${orderId}`}>
      https://tinkersynth.com/slopes?orderId={orderId}
    </a>

    <br />
    <br />
    <hr />

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

export default PurchaseJustPhysicalPrint;
