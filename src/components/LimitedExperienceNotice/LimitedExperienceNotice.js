// @flow
import React from 'react';
import styled from 'styled-components';

import { UNIT, COLORS } from '../../constants';

import Heading from '../Heading';
import Spacer from '../Spacer';
import Paragraph from '../Paragraph';

const LimitedExperienceNotice = () => {
  return (
    <>
      <Spacer size={UNIT * 2} />
      <Wrapper>
        <Title size={5}>
          <svg
            fill="none"
            height="16"
            width="16"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12" y2="16" />
          </svg>
          <Spacer size={UNIT} />
          Limited mobile experience
        </Title>
        <Spacer size={UNIT * 2} />

        <Paragraph
          style={{ color: COLORS.white, fontSize: 14, marginBottom: 0 }}
        >
          We highly recommend trying this page on a desktop computer, if
          possible. Larger screens provide access to many more controls, for a
          greatly enhanced experience.
        </Paragraph>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  margin-left: ${UNIT * 2}px;
  margin-right: ${UNIT * 2}px;
  padding: ${UNIT * 2}px;
  background: rgba(0, 0, 0, 0.4);
  color: ${COLORS.white};
`;

const Title = styled(Heading)`
  display: flex;
  align-items: center;
`;

export default LimitedExperienceNotice;
