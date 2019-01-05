// @flow
import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

import { COLORS, HEADER_HEIGHT, UNIT } from '../../constants';

import Logo from '../Logo';
import Spacer from '../Spacer';
import MaxWidthWrapper from '../MaxWidthWrapper';
import HeaderNavigationItem from './HeaderNavigationItem';
import Particle from '../Particle';
import LogoParticles from '../LogoParticles';

const Header = () => {
  return (
    <Wrapper>
      <Link to="/" style={{ display: 'block', textDecoration: 'none' }}>
        <SiteTitleWrapper>
          <Logo height={28} />
          <LogoParticles />

          <Spacer size={UNIT} />
          <SiteTitle>
            Tinker·S<span style={{ letterSpacing: 1 }}>y</span>
            <span style={{ letterSpacing: 1.5 }}>n</span>
            <span style={{ letterSpacing: 1.5 }}>t</span>h
          </SiteTitle>
        </SiteTitleWrapper>
      </Link>

      <Navigation>
        <HeaderNavigationItem to="/faq">FAQ</HeaderNavigationItem>
        <HeaderNavigationItem to="/about">About</HeaderNavigationItem>
        <HeaderNavigationItem to="/buy">Buy</HeaderNavigationItem>
        <HeaderNavigationItem to="/build">Build</HeaderNavigationItem>
      </Navigation>
    </Wrapper>
  );
};

const Wrapper = styled(MaxWidthWrapper)`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${HEADER_HEIGHT}px;
`;

const SiteTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Navigation = styled.ul`
  display: flex;
`;

const SiteTitle = styled.h1`
  font-size: 16px;
  color: ${COLORS.gray[900]};
  text-transform: uppercase;
  letter-spacing: 2px;
`;

export default Header;
