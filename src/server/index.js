import express from 'express';

import stripe, { stripeConfig } from './stripe';
import config from './config';

// Set up the express app
const app = express();

// When the user clicks "purchase", they'll be sent to Stripe for checkout.
// If they successfully complete that purchase, Stripe will fire a webhook,
// which will hit this path, containing all the info needed to produce the
// image, send the user an email, and mail them the print (if applicable).
app.get('/purchase/fulfill', (req, res) => {
  // I'm assuming
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
    stripeConfig,
    (err, coupon) => {
      // asynchronously called
    }
  );

  res.status(200).send({
    success: 'true',
    url: '',
  });
});
const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
