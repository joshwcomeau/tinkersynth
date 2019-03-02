/**
 * This module does all the order-fulfillment stuff:
 *   - Create high-res raster and vector images for the customer
 *   - Upload the assets to S3
 *   - Create the user account, store the order in the database
 *   - Email the user with the assets
 *   - Email me to let me know about the order
 */
import uuid from 'uuid/v1';

import { User, Order } from './database';
import { generateNewOrderId } from './database.helpers';
import { upload } from './google-cloud';
import { parallel } from './utils';
import {
  createOutputDirectoryIfNecessary,
  createRasterImage,
  createVectorImage,
} from './image-processing';
import { sendArtVectorEmail, notifyMe } from './email';

export default async function fulfill(
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
) {
  // Create a User, if we don't already have one.
  const [user, wasJustCreated] = await User.findOrCreate({
    where: { id: userId },
    defaults: { email, name: userName },
  });

  const newOrderId = await generateNewOrderId();

  // Associate an Order with this user
  const order = await Order.create({
    id: newOrderId,
    format,
    size,
    cost,
    artParams,
    chargeId: charge.id,
    shipTo: shippingAddress.shipTo,
    streetAddress: shippingAddress.streetAddress,
    city: shippingAddress.city,
    state: shippingAddress.state,
    country: shippingAddress.country,
    zipCode: shippingAddress.zipCode,
  });

  await user.addOrder(order);

  // Ensure that the "output" directory exists
  // NOTE: We need to do this _before_ starting to create the images in
  // parallel. Was seeing a bug where all 3 images try to create the
  // directory, since the `fs.stat` calls are all run at the same time.
  await createOutputDirectoryIfNecessary();

  const [vectorFile, rasterFileOpaque, rasterFileTransparent] = await parallel(
    createVectorImage(size, artParams, { fileId }),
    createRasterImage(size, artParams, {
      fileId,
      name: 'opaque',
      opaqueBackground: true,
      pixelsPerInch: 300,
    }),
    createRasterImage(size, artParams, {
      fileId,
      name: 'transparent',
      opaqueBackground: false,
      pixelsPerInch: 300,
    })
  );

  // prettier-ignore
  await parallel(
    upload(vectorFile.path, 'svg'),
    upload(rasterFileOpaque.path, 'png',),
    upload(rasterFileTransparent.path, 'png')
  );

  const urlPrefix = 'https://storage.googleapis.com/tinkersynth-art';
  const svgUrl = `${urlPrefix}/${fileId}.svg`;
  const pngUrlOpaque = `${urlPrefix}/${fileId}.opaque.png`;
  const pngUrlTransparent = `${urlPrefix}/${fileId}.transparent.png`;

  // Update the order model with these URLs
  order.svgUrl = svgUrl;
  order.pngUrlOpaque = pngUrlOpaque;
  order.pngUrlTransparent = pngUrlTransparent;

  await order.save();

  // Email the customer!
  sendArtVectorEmail(
    user.name,
    user.email,
    format,
    order.id,
    svgUrl,
    pngUrlTransparent,
    pngUrlOpaque
  );

  notifyMe(user.name, user.email, format, cost, order.id, charge.id);
}
