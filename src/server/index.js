import express from 'express';
import stripe from 'stripe';

let config;
if (process.env.NODE_ENV === 'production') {
  config = require('./config/prod.js');
} else {
  config = require('./config/dev.js');
}

// Set up the express app
const app = express();

// get all todos
app.get('/process-image', (req, res) => {
  // Set your secret key: remember to change this to your live secret key in production
  // See your keys here: https://dashboard.stripe.com/account/apikeys
  var stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

  stripe.checkout.sessions.create(
    {
      success_url: 'https://www.example.com/success',
      cancel_url: 'https://www.example.com/cancel',
      allowed_source_types: ['card'],
      line_items: [
        {
          amount: 2000,
          quantity: 2,
          name: 'Blue banana',
          currency: 'usd',
        },
      ],
    },
    { stripe_version: '2018-11-08; checkout_sessions_beta=v1' },
    function(err, coupon) {
      // asynchronously called
    }
  );
  res.status(200).send({
    success: 'true',
    message: 'todos retrieved successfully',
    todos: db,
  });
});
const PORT = process.env.NODE_ENV5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
