import { DEV_SERVER_PORT } from '../constants';
import { getDistinctId } from '../helpers/local-storage.helpers';

export const getApiUrl = () => {
  return process.env.NODE_ENV === 'production'
    ? 'https://api.tinkersynth.com'
    : `http://localhost:${DEV_SERVER_PORT}`;
};

export const submitCharge = ({
  artParams,
  addressData,
  format,
  size,
  cost,
  token,
  email,
}) => {
  const userId = getDistinctId();

  const shippingAddress = {
    shipTo: addressData.shipping_name,
    streetAddress: addressData.shipping_address_line1,
    city: addressData.shipping_address_city,
    state: addressData.shipping_address_state,
    country: addressData.shipping_address_country,
    zipCode: addressData.shipping_address_zip,
  };

  const body = JSON.stringify({
    artParams,
    shippingAddress,
    format,
    size,
    cost,
    token,
    userId,
    email,
  });

  const fulfillUrl = `${getApiUrl()}/purchase/fulfill`;

  return window
    .fetch(fulfillUrl, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })
    .then(response => response.json());
};

export const getOrderDetails = orderId => {
  const orderUrl = `${getApiUrl()}/orders/${orderId}`;
  return window.fetch(orderUrl).then(res => res.json());
};

export const submitContactForm = (
  firstName,
  lastName,
  email,
  subject,
  message
) => {
  const orderUrl = `${getApiUrl()}/contact`;

  const body = JSON.stringify({
    firstName,
    lastName,
    email,
    subject,
    message,
  });

  return window
    .fetch(orderUrl, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })
    .then(response => {
      if (response.status !== 200) {
        throw response;
      }

      return response.json();
    });
};
