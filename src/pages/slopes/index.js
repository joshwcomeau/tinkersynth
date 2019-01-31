// @flow
import React from 'react';
import loadable from '@loadable/component';

import Layout from '../../components/Layout';
import Loading from '../../components/Slopes/Loading';

const Slopes = loadable(() => import('../../components/Slopes'));

const SlopesIndex = () => (
  <Layout>
    {/* <Loading /> */}
    <Slopes fallback={<Loading />} />
  </Layout>
);

export default SlopesIndex;
