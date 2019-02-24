import React from 'react';
import styled from 'styled-components';

import { UNIT, COLORS } from '../../constants';

import Logo from '../Logo';
import Spacer from '../Spacer';

const getColorsForTheme = theme => {
  if (theme === 'dark') {
    return {
      tGradient: [COLORS.pink[300], COLORS.pink[300]],
      sColor: COLORS.blue[300],
      nameColor: COLORS.white,
    };
  }

  return {
    tGradient: ['#F218BC', '#FF1AFF'],
    sColor: '#3C22E6',
    nameColor: COLORS.gray[900],
  };
};

const LogoWithName = ({ id, theme = 'default' }) => {
  const logoColors = getColorsForTheme(theme);

  return (
    <Wrapper>
      <Logo id={id} height={28} colors={logoColors} />

      <Spacer size={UNIT} />

      <SiteTitle style={{ color: logoColors.nameColor }}>
        TinkerS<span style={{ letterSpacing: 1 }}>y</span>
        <span style={{ letterSpacing: 1.5 }}>n</span>
        <span style={{ letterSpacing: 1.5 }}>t</span>h
      </SiteTitle>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const SiteTitle = styled.h1`
  font-size: 16px;
  text-transform: lowercase;
  letter-spacing: 2px;
`;

export default LogoWithName;
