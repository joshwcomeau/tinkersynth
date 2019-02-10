import { STRIPE_PUBLIC_KEY } from '../constants';
import storeImageSrc from '../images/stripe-logo.png';

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
