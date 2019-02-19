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
      <strong>{order.shipTo}</strong>
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

  const toggleShipped = () => {
    setStatus('loading');

    postOrderShippedStatus(adminPassword, order.id, !order.shipped).then(() => {
      refreshDashboardData().then(() => {
        setStatus('idle');
      });
    });
  };

  return (
    <tr>
      <TableCell>
        {order.previewUrl && (
          <a href={order.pngUrlOpaque} target="_blank">
            <img src={order.previewUrl} style={{ height: 50 }} />
          </a>
        )}
      </TableCell>
      <TableCell>
        {format(new Date(order.createdAt), 'MMM D YYYY')}
        <Small>{format(new Date(order.createdAt), 'h:mm A')}</Small>
      </TableCell>
      <TableCell>{order.user.email}</TableCell>
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
            disabled={status === 'loading'}
            style={{ padding: '0 12px', margin: 'auto' }}
            color={order.shipped ? COLORS.green[500] : COLORS.blue[500]}
            onClick={() => toggleShipped()}
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
