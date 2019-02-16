import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants';

type Props = {
  size?: number,
  name: string,
  value: string,
  isChecked: boolean,
};

const RadioButton = ({ size = 16, name, value, isChecked }) => {
  return (
    <Wrapper>
      <RadioInput type="radio" name={name} value={value} checked={isChecked} />
      <AestheticRadio style={{ width: size, height: size }}>
        <OuterRing
          style={{
            borderColor: isChecked ? COLORS.blue[500] : COLORS.gray[700],
          }}
        />

        <CheckedCircle
          style={{ transform: isChecked ? `scale(1, 1)` : `scale(0, 0)` }}
        />
      </AestheticRadio>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const RadioInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  opacity: 0;
`;

const AestheticRadio = styled.div`
  position: relative;
  z-index: 1;
`;

const OuterRing = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 100%;
  border: 2px solid;
`;

const CheckedCircle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  border-radius: 100%;
  background: ${COLORS.blue[500]};
  transition: transform 300ms ease-out;
`;

export default RadioButton;
