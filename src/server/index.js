import express from 'express';
import bodyParser from 'body-parser';

import stripe, { stripeConfig } from './stripe';
import config from './config';

// Set up the express app
const app = express();
app.use(bodyParser.json());

// Allow CORS
// TODO: Change the headers to only support tinkersynth.com, in production.
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// The flow for charging someone is a bit complex, but effectively first a
// session needs to be created with Stripe, that details the stuff being
// purchased.
app.post('/purchase/create-session', (req, res) => {
  console.log(req.body);
  res.status(200).json({ ok: true, time: Date.now() });
});

// After successfully completing a purchase, Stripe will fire a webhook,
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

app.get('/', (req, res) => {
  res.status(200).send({ ok: true, time: Date.now() });
});

const { PORT } = config;

app.listen(PORT, () => {
  console.info(`server running on port ${PORT}`);
});
