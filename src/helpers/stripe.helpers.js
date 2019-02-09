import storeImageSrc from '../images/stripe-logo.png';
import { STRIPE_PUBLIC_KEY } from '../constants';

let handler;

export const createStripeConnection = () => {
  // Idempotent function
  if (handler) {
    return handler;
  }

  // Dependent on a global variable x_x.
  // Nothin' I can do about it, that's how Stripe rolls.
  handler = window.StripeCheckout.configure({
    key: STRIPE_PUBLIC_KEY,
    image: storeImageSrc,
  });

  return handler;
};

export const submitCharge = ({ artParams, format, size, cost, token }) => {
  const body = JSON.stringify({ artParams, format, size, cost, token });

  return window
    .fetch('http://localhost:1337/purchase/fulfill', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })
    .then(response => response.json());
};
