// @flow
import React from 'react';

import Layout from '../components/Layout';
import Spacer from '../components/Spacer';
import SEO from '../components/SEO';
import HomepageHowItWorks from '../components/HomepageHowItWorks';
import HomepageHero from '../components/HomepageHero';
import HomepagePrintInfo from '../components/HomepagePrintInfo';

const Homepage = ({}) => {
  return (
    <Layout theme="dark" pageId="homepage" noHeaderBorder>
      <SEO
        title="Generative Art Machines"
        keywords={['generative art', 'art', 'online store']}
      />

      <HomepageHero />
      <Spacer size={24} />
      <HomepageHowItWorks />
      <Spacer size={24} />
      <HomepagePrintInfo />
      <Spacer size={96} />
    </Layout>
  );
};

export default Homepage;
