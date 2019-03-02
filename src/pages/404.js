// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../constants';

import Layout from '../components/Layout';
import Link from '../components/Link';
import Spacer from '../components/Spacer';
import SEO from '../components/SEO';
import HomepageHowItWorks from '../components/HomepageHowItWorks';
import HomepageHero from '../components/HomepageHero';
import Heading from '../components/Heading';
import Paragraph from '../components/Paragraph';
import MaxWidthWrapper from '../components/MaxWidthWrapper';
import Button from '../components/Button';
import UnstyledButton from '../components/UnstyledButton';

const NotFound = () => {
  return (
    <Layout theme="dark" pageId="404" noHeaderBorder>
      <SEO title="Page not found" />

      <Wrapper>
        <Spacer size={128} />
        <Heading size={1} style={{ color: '#FFF' }}>
          Page not found.
        </Heading>
        <Spacer size={64} />
        <Paragraph style={{ color: '#FFF' }}>
          We weren't able to find anything at this location. Sorry about that!
        </Paragraph>
        <Spacer size={128} />

        <HomeButton as={Link} to="/">
          Go home
        </HomeButton>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled(MaxWidthWrapper)`
  text-align: center;
`;

const HomeButton = styled(UnstyledButton)`
  width: 270px;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  background: ${COLORS.gray[200]};
  color: ${COLORS.gray[900]};

  &:hover {
    background: ${COLORS.white};
    color: ${COLORS.black};
  }
`;

export default NotFound;
