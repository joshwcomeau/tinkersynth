// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS, UNIT } from '../../constants';

import AdminPage from '../../components/AdminPage';
import LayoutSidePage from '../../components/LayoutSidePage';

const Dashboard = () => {
  return (
    <LayoutSidePage title="Admin dashboard" adminPage={true}>
      <AdminPage pageId="dashboard" title="Dashboard">
        <p>Hello World</p>
      </AdminPage>
    </LayoutSidePage>
  );
};

export default Dashboard;
