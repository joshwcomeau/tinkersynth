// @flow
import React, { useState } from 'react';
import styled from 'styled-components';
import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/feather/plus';
import { minus } from 'react-icons-kit/feather/minus';

import { COLORS, UNIT } from '../../constants';
import analytics from '../../services/analytics.service';
import useToggle from '../../hooks/toggle.hook';

import UnstyledButton from '../UnstyledButton';
import Heading from '../Heading';
import Spacer from '../Spacer';
import FadeIn from '../FadeIn';

type Props = {
  id: string,
  question: string,
  isExpanded: boolean,
  toggleExpanded: (id: ?string) => void,
  children: React$Node,
};

const QuestionAndAnswer = ({
  id,
  question,
  isExpanded,
  toggleExpanded,
  children,
}: Props) => {
  return (
    <Wrapper>
      {/* Add an anchor for linking to specific questions */}
      <a id={id} />

      <Question
        onClick={() => {
          if (!isExpanded) {
            analytics.logEvent('expand-faq-question', { id });
          }
          return isExpanded ? toggleExpanded(null) : toggleExpanded(id);
        }}
      >
        <Icon
          icon={isExpanded ? minus : plus}
          size={32}
          style={{ color: COLORS.blue[500] }}
        />
        <Spacer size={UNIT * 2} />
        <Heading size={4}>{question}</Heading>
      </Question>

      {isExpanded && (
        <ChildWrapper>
          <FadeIn>{children}</FadeIn>
        </ChildWrapper>
      )}
    </Wrapper>
  );
};

const PADDING_SIZE = UNIT * 4;

const Wrapper = styled.div`
  padding: ${PADDING_SIZE}px 0;
`;

const Question = styled(UnstyledButton)`
  display: flex;
  align-items: center;
`;

const ChildWrapper = styled.div`
  padding-top: ${PADDING_SIZE}px;
`;

export default QuestionAndAnswer;
