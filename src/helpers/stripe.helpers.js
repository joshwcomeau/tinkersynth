import storeImageSrc from '../images/stripe-logo.png';

let handler;

const key =
  process.env.NODE_ENV === 'production'
    ? ''
    : 'pk_test_gDdRrVU2WlqLzp2lN9W4JppB';

export const createStripeConnection = () => {
  // Idempotent function
  if (handler) {
    return handler;
  }

  // Dependent on a global variable x_x.
  // Nothin' I can do about it, that's how Stripe rolls.
  handler = window.StripeCheckout.configure({
    key,
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
