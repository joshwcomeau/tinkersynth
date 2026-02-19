// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

import Link from '../Link';

type Props = { style?: React.CSSProperties; [key: string]: unknown };
const TextLink = ({ style, ...delegated }: Props) => {
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
