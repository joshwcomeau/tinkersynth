// @flow
import React from 'react';

import Layout from '../components/Layout';
import Spacer from '../components/Spacer';
import SEO from '../components/SEO';
import HomepageHowItWorks from '../components/HomepageHowItWorks';
import HomepageHero from '../components/HomepageHero';

const Homepage = ({}) => {
  return (
    <Layout theme="dark" pageId="homepage" noHeaderBorder>
      <SEO
        title="Generative Art Machines"
        keywords={['generative art', 'art', 'online store']}
      />

      <HomepageHero />
      <Spacer size={64} />
      <HomepageHowItWorks />
      <Spacer size={400} />
    </Layout>
  );
};

export default Homepage;
