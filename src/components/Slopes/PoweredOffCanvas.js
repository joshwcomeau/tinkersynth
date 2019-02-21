import React from 'react';
import styled from 'styled-components';
import Icon from 'react-icons-kit';
import { power as powerIcon } from 'react-icons-kit/feather/power';
import { u1F4A4 as zzzIcon } from 'react-icons-kit/noto_emoji_regular/u1F4A4';

import { COLORS, UNIT } from '../../constants';

import Heading from '../Heading';
import Spacer from '../Spacer';
import Paragraph from '../Paragraph';
import FadeIn from '../FadeIn';

const PoweredOffCanvas = () => {
  return (
    <Wrapper duration={500}>
      <FadeIn duration={500} delay={1200}>
        <MainContent>
          <Icon icon={zzzIcon} size={72} style={{ color: COLORS.gray[300] }} />
          <Spacer size={UNIT * 8} />

          <Heading size={4}>Machine Powered Off.</Heading>
          <Spacer size={UNIT * 4} />

          <Paragraph as="div" color={COLORS.gray[500]} style={{ fontSize: 15 }}>
            To continue creating, turn the machine back on, using the{' '}
            <Icon icon={powerIcon} /> button.
          </Paragraph>
        </MainContent>
      </FadeIn>
    </Wrapper>
  );
};

const Wrapper = styled(FadeIn)`
  position: absolute;
  /* HACK
     I need the powered-off-canvas to sit above the CanvasWrapper adjacent to
     it. I'm starting to worry about all the wrapping DOM nodes so I'm going
     for a hacky solution. Probably a bad idea.
  */
  z-index: 5;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${COLORS.gray[1000]};
`;

const MainContent = styled.div`
  position: absolute;
  top: 0;
  left: ${UNIT * 2}px;
  right: ${UNIT * 2}px;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  color: ${COLORS.white};
`;

export default PoweredOffCanvas;
