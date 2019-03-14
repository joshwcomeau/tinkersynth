import config from './config';

const stripe = require('stripe')(config.STRIPE_SECRET_KEY);

export const createCharge = ({
  artParams,
  shippingAddress,
  format,
  size,
  cost,
  token,
}) => {
  let description = `Slopes - ${format}`;

  if (format === 'print') {
    description = `${description} - ${size}`;
  }

  console.log({ cost, description, token, shippingAddress });

  return stripe.charges.create({
    amount: cost,
    currency: 'usd',
    description,
    source: token.id,
    metadata: shippingAddress,
  });
};

export default stripe;
