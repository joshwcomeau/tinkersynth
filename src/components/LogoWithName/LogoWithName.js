import React from 'react';
import styled from 'styled-components';

import { UNIT, COLORS } from '../../constants';

import Logo from '../Logo';
import Spacer from '../Spacer';

// TODO: Should sizing be customizable through props? I don't think so, since
// I probably want this to be used consistently?
const LogoWithName = ({ id, logoColors, nameColor = COLORS.gray[900] }) => {
  return (
    <Wrapper>
      <Logo id={id} height={28} colors={logoColors} />

      <Spacer size={UNIT} />

      <SiteTitle style={{ color: nameColor }}>
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
  text-transform: uppercase;
  letter-spacing: 2px;
`;

export default LogoWithName;
