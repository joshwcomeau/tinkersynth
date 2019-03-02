import React from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';

import { COLORS } from '../../constants';
import { postOrderShippedStatus } from './AdminDashboard.helpers';

import Button from '../Button';
import TextLink from '../TextLink';
import Paragraph from '../Paragraph';
import Heading from '../Heading';
import Spacer from '../Spacer';

const renderAddress = order => {
  let message;
  if (order.format === 'vector') {
    message = 'Not Applicable';
  } else if (!order.city) {
    message = '(No address)';
  }

  if (message) {
    return <span style={{ opacity: 0.6 }}>{message}</span>;
  }

  return (
    <>
      {order.user.email}
      <br />
      <br />
      <strong>Ship to:</strong>
      <br />
      {order.shipTo}
      <br />
      {order.streetAddress}
      <br />
      {order.city}, {order.state}
      <br />
      {order.country}
      <br />
      {order.zipCode}
    </>
  );
};

const OrderRow = ({ order, adminPassword, refreshDashboardData }) => {
  const [status, setStatus] = React.useState('idle');

  const markAsShipped = () => {
    const carrier = window.prompt('Enter carrier');
    const trackingNum = window.prompt('Enter tracking # (if available)');

    const isCorrect = window.confirm(
      `This order is shipped with ${carrier}, and the tracking number is ${trackingNum}`
    );

    if (!isCorrect) {
      return;
    }

    setStatus('loading');

    postOrderShippedStatus(
      adminPassword,
      order.id,
      carrier,
      trackingNum,
      !order.shipped
    ).then(() => {
      refreshDashboardData().then(() => {
        setStatus('idle');
      });
    });
  };

  return (
    <tr>
      <TableCell>{order.id}</TableCell>
      <TableCell>
        {format(new Date(order.createdAt), 'MMM D YYYY')}
        <Small>{format(new Date(order.createdAt), 'h:mm A')}</Small>
      </TableCell>
      <TableCell>
        <a href={order.svgUrl} target="_blank">
          SVG
        </a>
        <br />
        <a href={order.pngUrlTransparent} target="_blank">
          PNG (t)
        </a>
        <br />
        <a href={order.pngUrlOpaque} target="_blank">
          PNG (o)
        </a>
      </TableCell>

      <TableCell>
        {order.format}
        {order.format !== 'vector' && <Small>{order.size}</Small>}
      </TableCell>
      <TableCell>${order.cost / 100} USD</TableCell>
      <TableCell>{renderAddress(order)}</TableCell>
      <TableCell style={{ textAlign: 'center' }}>
        <StripeLink
          to={`https://dashboard.stripe.com/payments/${order.chargeId}`}
        >
          View on Stripe
        </StripeLink>
        <Spacer size={12} />
        {order.format !== 'vector' && (
          <Button
            disabled={status === 'loading' || order.shipped}
            style={{ padding: '0 12px', margin: 'auto' }}
            color={order.shipped ? COLORS.green[500] : COLORS.blue[500]}
            onClick={() => !order.shipped && markAsShipped()}
          >
            {status === 'loading'
              ? 'Loading...'
              : order.shipped
              ? 'Shipped!'
              : 'Mark shipped'}
          </Button>
        )}
      </TableCell>
    </tr>
  );
};

const TableCell = styled.td`
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 12px;
  font-size: 14px;
  line-height: 1.4;
  vertical-align: top;
`;

const Small = styled.div`
  font-size: 0.8em;
  opacity: 0.75;
`;

const StripeLink = styled(TextLink)``;

export default OrderRow;
