import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import format from 'date-fns/format';

import { getApiUrl } from '../../helpers/api.helpers';

import Button from '../Button';
import TextLink from '../TextLink';
import Spacer from '../Spacer';

const useDashboardData = adminPassword => {
  const [data, setData] = React.useState(null);

  React.useEffect(
    () => {
      if (typeof adminPassword !== 'string') {
        return;
      }

      window
        .fetch(`${getApiUrl()}/admin/dashboard`, {
          method: 'GET',
          mode: 'cors',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `basic ${adminPassword}`,
          },
        })
        .then(res => {
          return res.json();
        })
        .then(json => {
          setData(json);
        })
        .catch(err => {
          console.error(err);
        });
    },
    [adminPassword]
  );

  return data;
};

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

const AdminDashboard = ({ adminPassword }) => {
  const dashboardData = useDashboardData(adminPassword);

  if (!dashboardData) {
    return 'Loading...';
  }

  return (
    <table
      style={{ width: '100%', border: '1px solid rgba(0, 0, 0, 0.2)' }}
      cellSpacing={2}
    >
      <thead>
        <tr>
          <HeaderCell>Date</HeaderCell>
          <HeaderCell>Customer</HeaderCell>
          <HeaderCell>Type</HeaderCell>
          <HeaderCell>Cost</HeaderCell>
          <HeaderCell>Ship to</HeaderCell>
          <HeaderCell>Actions</HeaderCell>
        </tr>
      </thead>
      <tbody>
        {dashboardData.orders.map(order => (
          <tr>
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
              <Button style={{ padding: '0 12px', margin: 'auto' }}>
                Mark Shipped
              </Button>
            </TableCell>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const mapStateToProps = state => {
  return {
    adminPassword: state.admin.password,
  };
};

const HeaderCell = styled.th`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 3px solid rgba(0, 0, 0, 0.4);
  text-align: left;
  font-size: 16px;
  padding: 12px;
`;

const TableCell = styled.td`
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 12px;
  line-height: 1.4;
`;

const Small = styled.div`
  font-size: 0.8em;
  opacity: 0.75;
`;

const StripeLink = styled(TextLink)`
  height: 40px;
  line-height: 40px;
`;

export default connect(mapStateToProps)(AdminDashboard);
