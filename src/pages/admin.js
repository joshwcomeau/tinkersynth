// @flow
import React from 'react';
import styled from 'styled-components';

import { DEV_SERVER_PORT } from '../constants';

import Layout from '../components/Layout';
import MaxWidthWrapper from '../components/MaxWidthWrapper';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://api.tinkersynth.com'
    : `http://localhost:${DEV_SERVER_PORT}`;

const Admin = () => {
  const [data, setData] = React.useState(null);

  // TODO

  return (
    <Layout>
      <Wrapper>
        <h1>Admin Portal</h1>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled(MaxWidthWrapper)`
  padding-top: 3rem;
`;

export default Admin;
