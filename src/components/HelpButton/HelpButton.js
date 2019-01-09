import React from 'react';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import { u2049 as bangQuestion } from 'react-icons-kit/noto_emoji_regular/u2049';

const HelpButton = () => {
  return (
    <Wrapper>
      <Icon icon={bangQuestion} />
    </Wrapper>
  );
};

const Wrapper = styled.button`
  padding: 0;
  background: transparent;
  border: none;
  color: white;
`;

export default HelpButton;
