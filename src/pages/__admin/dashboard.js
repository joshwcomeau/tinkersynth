// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS, UNIT } from '../../constants';

import AdminPage from '../../components/AdminPage';

const Dashboard = () => {
  return (
    <AdminPage pageId="dashboard" title="Dashboard">
      <p>Hello World</p>
    </AdminPage>
  );
};

export default Dashboard;
