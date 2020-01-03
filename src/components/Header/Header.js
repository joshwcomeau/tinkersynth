// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS, HEADER_HEIGHT, UNIT, BREAKPOINTS } from '../../constants';

import Logo from '../Logo';
import Spacer from '../Spacer';
import Link from '../Link';
import MaxWidthWrapper from '../MaxWidthWrapper';
import HeaderNavigationItem from './HeaderNavigationItem';
import Particle from '../Particle';
import LogoWithName from '../LogoWithName';
import HamburgerMenu from '../HamburgerMenu';

const Header = ({ theme, noBorder }) => {
  const navigationLinkColor =
    theme === 'dark' ? COLORS.white : COLORS.gray[900];

  return (
    <OuterWrapper showBorder={!noBorder}>
      <InnerWrapper>
        <Link to="/slopes" style={{ display: 'block', textDecoration: 'none' }}>
          <LogoWithName theme={theme} id="site-header" />
        </Link>

        <DesktopOnly>
          <Navigation>
            <HeaderNavigationItem color={navigationLinkColor} to="/slopes">
              Create
            </HeaderNavigationItem>
            <HeaderNavigationItem color={navigationLinkColor} to="/faq">
              FAQ
            </HeaderNavigationItem>
            <HeaderNavigationItem color={navigationLinkColor} to="/contact">
              Contact
            </HeaderNavigationItem>
          </Navigation>
        </DesktopOnly>
        <MobileOnly>
          <HamburgerMenu theme={theme} />
        </MobileOnly>
      </InnerWrapper>
    </OuterWrapper>
  );
};

const OuterWrapper = styled.div`
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  border-bottom: ${props =>
    props.showBorder && '1px solid rgba(255, 255, 255, 0.06)'};
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
const MobileOnly = styled.span`
  @media ${BREAKPOINTS.mdMin} {
    display: none;
  }
`;

export default Header;
