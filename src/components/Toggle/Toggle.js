// @flow
import React from 'react';
import styled from 'styled-components';

import Handle from './Handle';
import { COLORS } from '../../constants';

type Props = {
  width: number,
  height: number,
  isToggled: boolean,
  handleToggle: (newVal: boolean) => void,
};

const Toggle = ({ width, height, isToggled, handleToggle }: Props) => {
  const controlBorder = 2;
  const controlPadding = 2;
  const handleSize = height - controlPadding * 2 - controlBorder;

  const controlWidth = handleSize * 2 + controlPadding * 2;
  const maxHandleTranslate = handleSize - controlPadding;

  return (
    <Button
      style={{ width, height }}
      onMouseDown={() => handleToggle(!isToggled)}
    >
      <InnerWrapper
        style={{
          width: controlWidth,
          padding: controlPadding,
          borderWidth: controlBorder,
        }}
      >
        <HandleWrapper
          style={{
            width: handleSize,
            height: handleSize,
            transform: isToggled
              ? `translateX(${maxHandleTranslate}px)`
              : 'translateX(0px)',
          }}
        >
          <Handle size={handleSize} />
        </HandleWrapper>
      </InnerWrapper>
    </Button>
  );
};

const Button = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;

  &:focus:not(.focus-visible) {
    outline: none;
  }
`;

const InnerWrapper = styled.div`
  position: relative;
  height: 100%;
  margin: auto;
  border-style: solid;
  border-color: ${COLORS.gray[300]};
  border-radius: 100px;
`;

const HandleWrapper = styled.div`
  transition: transform 300ms;
`;

export default Toggle;
