// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS, UNIT } from '../../constants';

type Props = {
  as?: 'input' | 'textarea',
  type: 'text' | 'email' | 'password',
  value: string,
  updateValue: (value: string) => void,
  isActive: boolean,
};

const TextInput = ({
  as = 'input',
  type,
  value,
  updateValue,
  isActive,
  width,
  ...delegated
}: Props) => {
  return (
    <Wrapper style={{ width }}>
      <Input
        as={as}
        type={type}
        value={value}
        onChange={ev => updateValue(ev.currentTarget.value)}
        {...delegated}
      />
      <BottomBorder
        style={{
          backgroundColor: isActive ? COLORS.blue[500] : COLORS.gray[900],
          bottom: isActive ? -3 : -2,
          height: isActive ? 4 : 2,
        }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: block;
  position: relative;
`;

const Input = styled.input`
  position: relative;
  width: 100%;
  z-index: 2;
  display: block;
  padding: ${UNIT}px 0;
  background: transparent;
  font-size: 18px;
  border: none;
  outline: none;

  &::placeholder {
    opacity: 0.5;
  }
`;

const BottomBorder = styled.div`
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  bottom: -3px;
  height: 3px;
  background: ${COLORS.gray[700]};
  border-radius: 4px;
`;

export default TextInput;
