import express from 'express';
import bodyParser from 'body-parser';
import uuid from 'uuid/v1';

import config from './config';
import { User, Order } from './database';
import { upload } from './google-cloud';
import fulfill from './fulfillment';
import adminOnly from './admin-middleware';
import { createCharge } from './stripe';
import { createRasterImage, createVectorImage } from './image-processing';
import { sendContactEmail } from './email';

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
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT');
  next();
});

/**
 * This endpoint allows users to 'resume' an order, by preselecting all the
 * controls for the machine. Note that we need to be sure not to expose any
 * PII through this endpoint; all it does is populate art parameters.
 */
app.get('/orders/:orderId', async (req, res) => {
  const order = await Order.findOne({
    where: {
      id: req.params.orderId,
    },
  });

  if (!order) {
    return res.sendStatus(404);
  }

  return res.json({ params: order.artParams });
});

/**
 * Handle submissions to the contact form at tinkersynth.com/contact
 */
app.post('/contact', async (req, res) => {
  const { firstName, lastName, email, subject, message } = req.body;

  if (!firstName || !lastName || !email || !subject || !message) {
    return res.sendStatus(422);
  }

  sendContactEmail(firstName, lastName, email, subject, message)
    .then(result => {
      return res.json({ result });
    })
    .catch(err => {
      console.error('error', err);

      return res.sendStatus(500).json({ error: err });
    });
});

/**
 * After entering payment details in the Stripe widget-modal, we make a request
 * to the server to fulfill the purchase. This involves:
 *
 * - Creating the charge, charging the customer
 * - Creating a preview image to show them right away, uploading to GCS
 * - A bunch of other fulfillment stuff, done asynchronously after the
 *   response.
 */
app.post('/purchase/fulfill', async (req, res) => {
  const {
    artParams,
    shippingAddress,
    userId,
    email,
    format,
    size,
    cost,
    token,
  } = req.body;

  try {
    const charge = await createCharge(req.body);

    const fileId = uuid();

    const userName = charge.source.name || shippingAddress.shipTo;

    // Kick-start the real business of sending emails and creating orders in
    // the local database... but we don't have to wait for it to complete.
    // It's slow.
    fulfill(
      format,
      size,
      artParams,
      shippingAddress,
      cost,
      userId,
      userName,
      email,
      fileId,
      charge
    );

    return res.status(200).send({
      ok: true,
      format,
    });
  } catch (err) {
    console.error(err);

    res.status(500).send({
      success: 'false',
      url: '',
    });
  }
});

/**
 * Admin-only routes
 */
app.post('/admin/authenticate', adminOnly, async (req, res) => {
  res.send({ ok: true });
});

app.get('/admin/dashboard', adminOnly, async (req, res) => {
  const orders = await Order.findAll({ include: [User] });
  res.send({ orders });
});

app.put('/admin/toggle-order-shipped', adminOnly, async (req, res) => {
  const { orderId, shipped } = req.body;

  const order = await Order.findByPk(orderId);

  order.shipped = shipped;

  await order.save();

  res.send({ order });
});

/**
 * Launch server!
 */
const { PORT } = config;
app.listen(PORT, () => {
  console.info(`server running on port ${PORT}`);
});
