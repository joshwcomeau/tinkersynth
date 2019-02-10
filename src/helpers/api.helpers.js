import { DEV_SERVER_PORT } from '../constants';
import { getDistinctId } from '../helpers/local-storage.helpers';

export const getApiUrl = () => {
  return process.env.NODE_ENV === 'production'
    ? 'https://api.tinkersynth.com'
    : `http://localhost:${DEV_SERVER_PORT}`;
};

export const submitCharge = ({ artParams, format, size, cost, token }) => {
  const userId = getDistinctId();

  const body = JSON.stringify({ artParams, format, size, cost, token, userId });

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
