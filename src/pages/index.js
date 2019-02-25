// @flow
import React from 'react';

import Layout from '../components/Layout';
import Spacer from '../components/Spacer';
import HomepageHowItWorks from '../components/HomepageHowItWorks';
import HomepageHero from '../components/HomepageHero';

const Homepage = ({}) => {
  return (
    <Layout theme="dark" pageId="homepage" noHeaderBorder>
      <HomepageHero />
      <Spacer size={64} />
      <HomepageHowItWorks />
      <Spacer size={400} />
    </Layout>
  );
};

export default Homepage;
