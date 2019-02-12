import express from 'express';
import bodyParser from 'body-parser';

import config from './config';
import { upload } from './google-cloud';
import fulfill from './fulfillment';
import { createCharge } from './stripe';
import { createRasterImage, createVectorImage } from './image-processing';

import './database';

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
app.post('/purchase/fulfill', async (req, res) => {
  const { artParams, userId, format, size, cost, token } = req.body;

  try {
    const charge = await createCharge(req.body);

    const previewImage = await createRasterImage(size, artParams, {
      opaqueBackground: true,
      pixelsPerInch: 25, // TODO: find the right number
    });

    const previewUrl = await upload(previewImage.path);

    // Kick-start the real business of sending emails and creating orders in
    // the local database... but we don't have to wait for it to complete.
    // It's slow.
    console.log(cost, token, charge);
    fulfill(format, size, artParams, cost, userId, charge);

    return res.status(200).send({
      previewUrl,
      width: previewImage.width,
      height: previewImage.height,
    });
  } catch (err) {
    console.error(err);

    res.status(500).send({
      success: 'false',
      url: '',
    });
  }
});

app.get('/ping', (req, res) => {
  res.status(200).send({ ok: true, time: Date.now() });
});

const { PORT } = config;

app.listen(PORT, () => {
  console.info(`server running on port ${PORT}`);
});
