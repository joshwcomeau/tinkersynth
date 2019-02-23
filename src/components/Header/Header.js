// @flow
import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

import { COLORS, HEADER_HEIGHT, UNIT, BREAKPOINTS } from '../../constants';

import Logo from '../Logo';
import Spacer from '../Spacer';
import MaxWidthWrapper from '../MaxWidthWrapper';
import HeaderNavigationItem from './HeaderNavigationItem';
import Particle from '../Particle';
import LogoWithName from '../LogoWithName';

const Header = ({ theme }) => {
  const navigationLinkColor =
    theme === 'dark' ? COLORS.white : COLORS.gray[900];

  return (
    <OuterWrapper
      style={{
        background: theme === 'dark' ? COLORS.gray[900] : COLORS.white,
      }}
    >
      <InnerWrapper>
        <Link to="/" style={{ display: 'block', textDecoration: 'none' }}>
          <LogoWithName theme={theme} id="site-header" />
        </Link>

        <Navigation>
          <HeaderNavigationItem color={navigationLinkColor} to="/slopes">
            Create
          </HeaderNavigationItem>
          <HeaderNavigationItem color={navigationLinkColor} to="/faq">
            FAQ
          </HeaderNavigationItem>
          <DesktopOnly>
            <HeaderNavigationItem color={navigationLinkColor} to="/contact">
              Contact
            </HeaderNavigationItem>
          </DesktopOnly>
        </Navigation>
      </InnerWrapper>
    </OuterWrapper>
  );
};

const OuterWrapper = styled.div`
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
`;

const InnerWrapper = styled(MaxWidthWrapper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${HEADER_HEIGHT}px;
`;

const Navigation = styled.ul`
  display: flex;
`;

const DesktopOnly = styled.span`
  @media ${BREAKPOINTS.sm} {
    display: none;
  }
`;

export default Header;
