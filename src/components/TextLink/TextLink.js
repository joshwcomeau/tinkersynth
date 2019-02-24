import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

import Link from '../Link';

const TextLink = ({ style, ...delegated }) => {
  return (
    <Wrapper style={style}>
      <Link {...delegated} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: inline;
  font-weight: bold;
  color: ${COLORS.blue[500]};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default TextLink;
