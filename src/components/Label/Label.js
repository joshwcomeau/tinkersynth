// @flow
import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants';

type Props = {
  htmlFor?: string,
  isActive?: boolean,
  children: React$Node,
};

const Label = ({ htmlFor, isActive, children }: Props) => {
  return (
    <Wrapper
      htmlFor={htmlFor}
      style={{ color: isActive ? COLORS.blue[500] : COLORS.gray[700] }}
    >
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.label`
  font-size: 14px;
  font-weight: 500;
`;

export default Label;
