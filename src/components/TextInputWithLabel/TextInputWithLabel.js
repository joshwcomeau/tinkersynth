// @flow
import React from 'react';
import styled from 'styled-components';

import TextInput from '../TextInput';
import Label from '../Label';
import Spacer from '../Spacer';

type Props = {
  id: string,
  type: 'text' | 'email' | 'password',
  value: string,
  updateValue: (value: string) => void,
  labelText: React$Node,
};

const TextInputWithLabel = ({
  id,
  type,
  value,
  updateValue,
  labelText,
  ...delegated
}: Props) => {
  const [isActive, setIsActive] = React.useState(false);

  return (
    <Wrapper>
      <Label htmlFor={id} isActive={isActive}>
        {labelText}
      </Label>
      <TextInput
        id={id}
        type={type}
        value={value}
        updateValue={updateValue}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        isActive={isActive}
        {...delegated}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default TextInputWithLabel;
