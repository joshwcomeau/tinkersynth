import { getApiUrl } from '../../helpers/api.helpers';

export const fetchDashboardData = password => {
  return window
    .fetch(`${getApiUrl()}/admin/dashboard`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `basic ${password}`,
      },
    })
    .then(res => {
      return res.json();
    })
    .catch(err => {
      console.error(err);
    });
};

export const postOrderShippedStatus = (
  password,
  orderId,
  carrier,
  trackingNum,
  newShippedStatus
) => {
  return window
    .fetch(`${getApiUrl()}/admin/toggle-order-shipped`, {
      method: 'PUT',
      body: JSON.stringify({
        orderId,
        shipped: newShippedStatus,
        carrier,
        trackingNum,
      }),
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `basic ${password}`,
      },
    })
    .then(res => {
      return res.json();
    })
    .catch(err => {
      console.error(err);
    });
};
