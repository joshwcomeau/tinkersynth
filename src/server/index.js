import express from 'express';
import bodyParser from 'body-parser';

import config from './config';
import { parallel } from './utils';
import { User } from './database';
import { upload } from './google-cloud';
import { createCharge } from './stripe';
import processSlopes from './process-slopes';
import database from './database';
import { sendArtVectorEmail } from './email';

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

    const userEmail = charge.receipt_email || 'josh@tinkersynth.com';
    const userName = charge.source.name;

    const {
      fileId,
      svgPath,
      pngPathTransparent,
      pngPathOpaque,
    } = await processSlopes(size, format, artParams);

    // prettier-ignore
    await parallel(
      upload(svgPath, 'svg'),
      upload(pngPathTransparent, 'png'),
      upload(pngPathOpaque, 'png'),
    );

    // Create a User, if we don't already have one.
    const [user, wasJustCreated] = await User.findOrCreate({
      where: { id: userId },
      defaults: { email: userEmail, name: userName },
    });

    const svgUrl = `https://storage.googleapis.com/tinkersynth-art/${fileId}.svg`;
    const pngUrlTransparent = `https://storage.googleapis.com/tinkersynth-art/${fileId}.transparent.png`;
    const pngUrlOpaque = `https://storage.googleapis.com/tinkersynth-art/${fileId}.opaque.png`;

    // Email the customer!
    sendArtVectorEmail(
      user.name,
      user.email,
      format,
      svgUrl,
      pngUrlTransparent,
      pngUrlOpaque
    );

    res.status(200).send({
      success: 'true',
      url: '',
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
