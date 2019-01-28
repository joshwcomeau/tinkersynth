import config from './config';

const stripe = require('stripe')(config.STRIPE_KEY);

export const stripeConfig = {
  stripe_version: '2018-11-08; checkout_sessions_beta=v1',
};

export default stripe;
