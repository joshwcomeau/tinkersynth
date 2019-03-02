import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { COLORS } from '../../constants';
import { fetchDashboardData } from './AdminDashboard.helpers';

import Button from '../Button';
import TextLink from '../TextLink';
import Paragraph from '../Paragraph';
import Heading from '../Heading';
import Spacer from '../Spacer';
import OrderRow from './OrderRow';

const AdminDashboard = ({ adminPassword }) => {
  const [dashboardData, setDashboardData] = React.useState(null);

  React.useEffect(
    () => {
      if (typeof adminPassword !== 'string') {
        return;
      }

      fetchDashboardData(adminPassword).then(json => {
        setDashboardData(json);
      });
    },
    [adminPassword]
  );

  if (!dashboardData) {
    return 'Loading...';
  }

  const refreshDashboardData = () => {
    return fetchDashboardData(adminPassword).then(json => {
      setDashboardData(json);
    });
  };

  const totalSales = dashboardData.orders.reduce(
    (acc, order) => acc + order.cost,
    0
  );

  return (
    <>
      <Heading size={4}>Total sales:</Heading>
      <Paragraph>${totalSales / 100} USD</Paragraph>

      <Spacer size={25} />

      <table
        style={{ width: '100%', border: '1px solid rgba(0, 0, 0, 0.2)' }}
        cellSpacing={2}
      >
        <thead>
          <tr>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Date</HeaderCell>
            <HeaderCell>Images</HeaderCell>
            <HeaderCell>Type</HeaderCell>
            <HeaderCell>Cost</HeaderCell>
            <HeaderCell>Customer</HeaderCell>
            <HeaderCell>Actions</HeaderCell>
          </tr>
        </thead>
        <tbody>
          {dashboardData.orders.map(order => (
            <OrderRow
              key={order.id}
              order={order}
              adminPassword={adminPassword}
              refreshDashboardData={refreshDashboardData}
            />
          ))}
        </tbody>
      </table>
    </>
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
  font-size: 14px;
  line-height: 1.4;
  vertical-align: top;
`;

const Small = styled.div`
  font-size: 0.8em;
  opacity: 0.75;
`;

const StripeLink = styled(TextLink)``;

export default connect(mapStateToProps)(AdminDashboard);
