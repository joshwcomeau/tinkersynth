import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

import { UNIT, COLORS } from '../../constants';

import LogoWithName from '../LogoWithName';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Spacer from '../Spacer';
import TextLink from '../TextLink';

const Footer = ({ theme }) => {
  return (
    <Wrapper>
      <InnerWrapper>
        <Link to="/slopes" style={{ display: 'block', textDecoration: 'none' }}>
          <LogoWithName id="footer-logo" theme="dark" />
        </Link>

        <CopyrightArea>
          <Line>
            <strong>© 2019-present Josh Comeau.</strong> All rights reserved.
          </Line>
          <Spacer size={UNIT} />
          <Line>
            <TextLink to="/privacy" style={{ color: COLORS.gray[500] }}>
              Privacy Policy
            </TextLink>
            &nbsp;&nbsp;&nbsp; ·&nbsp;&nbsp;&nbsp;
            <TextLink to="/contact" style={{ color: COLORS.gray[500] }}>
              Contact
            </TextLink>
          </Line>
        </CopyrightArea>
      </InnerWrapper>
      <ScrollOverflow />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: ${UNIT * 4}px 0px;
  background-color: ${COLORS.navy};
`;

const InnerWrapper = styled(MaxWidthWrapper)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CopyrightArea = styled.div`
  display: inline-block;
  text-align: right;
  font-size: 14px;
  color: ${COLORS.white};

  @media (max-width: 600px) {
    margin-top: ${UNIT * 4}px;
    text-align: center;
  }
`;

const Line = styled.div``;

const ScrollOverflow = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: -100px;
  height: 100px;
  background: ${COLORS.gray[900]};
`;

export default Footer;
