import express from 'express';
import bodyParser from 'body-parser';

import { createCharge } from './stripe';
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

// After successfully completing a purchase, Stripe will fire a webhook,
// which will hit this path, containing all the info needed to produce the
// image, send the user an email, and mail them the print (if applicable).
app.post('/purchase/fulfill', (req, res) => {
  const { artParams, format, size, cost, token } = req.body;

  createCharge(req.body)
    .then((...args) => {
      console.log('Success', args);

      res.status(200).send({
        success: 'true',
        url: '',
      });
    })
    .catch(err => {
      console.error(err);

      res.status(500).send({
        success: 'false',
        url: '',
      });
    });
});

app.get('/ping', (req, res) => {
  res.status(200).send({ ok: true, time: Date.now() });
});

const { PORT } = config;

app.listen(PORT, () => {
  console.info(`server running on port ${PORT}`);
});
