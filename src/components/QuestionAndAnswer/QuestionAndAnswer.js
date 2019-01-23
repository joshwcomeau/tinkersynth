// @flow
import React, { useState } from 'react';
import styled from 'styled-components';

import { COLORS, UNIT } from '../../constants';
import useToggle from '../../hooks/toggle.hook';

import UnstyledButton from '../UnstyledButton';
import Heading from '../Heading';

type Props = {
  question: string,
  children: React$Node,
};

const QuestionAndAnswer = ({ question, children }: Props) => {
  const [isExpanded, toggleExpanded] = useToggle(false);

  return (
    <Wrapper
      style={{ backgroundColor: isExpanded ? COLORS.gray[100] : COLORS.white }}
    >
      <Question onClick={toggleExpanded}>
        <Heading size={3}>{question}</Heading>
      </Question>

      {isExpanded && children}
    </Wrapper>
  );
};

const PADDING_SIZE = UNIT * 4;

const Wrapper = styled.div`
  padding: ${PADDING_SIZE}px;
  margin-left: ${-PADDING_SIZE}px;
  margin-right: ${-PADDING_SIZE}px;
`;

const Question = styled(UnstyledButton)`
  margin-bottom: ${UNIT * 2}px;
`;

export default QuestionAndAnswer;
