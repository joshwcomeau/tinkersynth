import express from 'express';
import bodyParser from 'body-parser';

import config from './config';
import { parallel } from './utils';
import { User } from './database';
import { upload } from './google-cloud';
import { createCharge } from './stripe';
import { createRasterImage, createVectorImage } from './image-processing';
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

    // Create a small raster preview for the user
    // TODO: Refactor `processSlopes` to accept multiple kinds of output.
    // Clean up the below stuff as well (and move it to another module)

    const userEmail = charge.receipt_email || 'josh@tinkersynth.com';
    const userName = charge.source.name;

    const vectorFile = await createVectorImage(size, artParams);

    const rasterFileOpaque = await createRasterImage(size, artParams, {
      opaqueBackground: true,
      pixelsPerInch: 300,
    });
    const rasterFileTransparent = await createRasterImage(size, artParams, {
      opaqueBackground: false,
      pixelsPerInch: 300,
    });

    // prettier-ignore
    await parallel(
      upload(vectorFile.path, 'svg'),
      upload(rasterFileOpaque.path, 'png'),
      upload(rasterFileTransparent.path, 'png'),
    );

    // Create a User, if we don't already have one.
    const [user, wasJustCreated] = await User.findOrCreate({
      where: { id: userId },
      defaults: { email: userEmail, name: userName },
    });

    const urlPrefix = 'https://storage.googleapis.com/tinkersynth-art';
    const svgUrl = `${urlPrefix}/${vectorFile.id}.svg`;
    const pngUrlOpaque = `${urlPrefix}/${rasterFileOpaque.path}.png`;
    const pngUrlTransparent = `${urlPrefix}/${rasterFileTransparent.path}.png`;

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
      previewUrl: pngUrlOpaque,
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
