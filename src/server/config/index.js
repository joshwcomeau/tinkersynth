// All hardcoded values are meant to be used in dev.
// In production, the values should be set in the environment.
import path from 'path';

import { DEV_SERVER_PORT } from '../../constants';

require('dotenv').config();

const config = {
  STRIPE_SECRET_KEY:
    process.env.TS_STRIPE_SECRET_KEY || 'sk_test_e8GtJPEUD8WNtgv0LQA5TIsD',
  DATABASE_PATH: process.env.TS_DATABASE_PATH || './db.sqlite',
  PORT: process.env.TS_PORT || DEV_SERVER_PORT,
};

module.exports = config;
