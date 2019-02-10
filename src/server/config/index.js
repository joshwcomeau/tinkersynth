// All hardcoded values are meant to be used in dev.
// In production, the values should be set in the environment.
const path = require('path');

require('dotenv').config({ path: path.resolve(process.cwd(), '../.env') });

const config = {
  STRIPE_SECRET_KEY:
    process.env.TS_STRIPE_SECRET_KEY || 'sk_test_e8GtJPEUD8WNtgv0LQA5TIsD',
  DATABASE_PATH: process.env.TS_DATABASE_PATH || './db.sqlite',
  PORT: process.env.TS_PORT || 1337,
};

console.log('\n\n\n\n\nENVIRONMENT', process.env);
console.log('\n\nRESULTING CONFIG:', config);

module.exports = config;
