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
import LogoWithName from '../LogoWithName';

const Header = () => {
  return (
    <OuterWrapper>
      <InnerWrapper>
        <Link to="/" style={{ display: 'block', textDecoration: 'none' }}>
          <LogoWithName id="site-header" />
        </Link>

        <Navigation>
          <HeaderNavigationItem to="/slopes">Create</HeaderNavigationItem>
          <HeaderNavigationItem to="/faq">FAQ</HeaderNavigationItem>
          <HeaderNavigationItem to="/contact">Contact</HeaderNavigationItem>
        </Navigation>
      </InnerWrapper>
    </OuterWrapper>
  );
};

const OuterWrapper = styled.div`
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  background: ${COLORS.white};
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

export default Header;
