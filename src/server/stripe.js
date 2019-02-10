import config from './config';

const stripe = require('stripe')(config.STRIPE_SECRET_KEY);

export const createCharge = ({ artParams, format, size, cost, token }) => {
  let description = `Slopes - ${format}`;

  if (format === 'print') {
    description = `${description} - ${size}`;
  }

  return stripe.charges.create({
    amount: cost,
    currency: 'usd',
    description,
    source: token.id,
  });
};

export default stripe;
