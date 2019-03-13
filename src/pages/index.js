// @flow
import React from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout';
import Spacer from '../components/Spacer';
import SEO from '../components/SEO';
import HomepageHowItWorks from '../components/HomepageHowItWorks';
import HomepageHero from '../components/HomepageHero';
import HomepagePrintInfo from '../components/HomepagePrintInfo';
import HomepageGetStartedButton from '../components/HomepageGetStartedButton/HomepageGetStartedButton';
import Paragraph from '../components/Paragraph';
import { COLORS, BREAKPOINTS } from '../constants';

const Homepage = () => {
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
      <FinalCtaWrapper>
        <CtaParagraph>Ready to create something amazing?</CtaParagraph>
        <Spacer size={18} />
        <HomepageGetStartedButton copy="Get started" />
      </FinalCtaWrapper>
      <Spacer size={128} />
    </Layout>
  );
};

const CtaParagraph = styled(Paragraph)`
  color: ${COLORS.white};

  @media ${BREAKPOINTS.mdMin} {
    font-size: 28px;
  }
`;

const FinalCtaWrapper = styled.div`
  text-align: center;
`;

export default Homepage;
