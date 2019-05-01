// @flow
import React from 'react';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import SlopesIndex from '../components/Slopes/SlopesIndex';

const Page = ({ location }) => (
  <Layout pageId="slopes" theme="dark">
    <SEO
      title="Slopes"
      ogTitle="Generative Art Machine"
      keywords={['generative art', 'art', 'online store']}
    />

    <SlopesIndex location={location} />
  </Layout>
);

export default Page;
