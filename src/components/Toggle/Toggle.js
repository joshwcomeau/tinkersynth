// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

import RoundHandle from '../RoundHandle';
import UnstyledButton from '../UnstyledButton';

type Props = {
  width: number,
  height: number,
  isToggled: boolean,
  isDisabled?: boolean,
  handleToggle: (newVal: boolean) => void,
};

const Toggle = ({
  width,
  height,
  isToggled,
  isDisabled,
  handleToggle,
}: Props) => {
  const controlBorder = 1;
  const controlPadding = 1;
  const handleSize = height - controlPadding * 2 - controlBorder;

  const controlWidth = handleSize * 2 + controlPadding * 2;
  const maxHandleTranslate = handleSize - controlPadding;

  return (
    <Button
      style={{ width, height }}
      onMouseDown={() => handleToggle(!isToggled)}
      tabIndex={isDisabled ? -1 : 0}
      onKeyPress={ev => {
        if (ev.key === 'Enter') {
          handleToggle(!isToggled);
        }
      }}
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
          <RoundHandle size={handleSize} />
        </HandleWrapper>
      </InnerWrapper>
    </Button>
  );
};

const Button = styled(UnstyledButton)`
  cursor: pointer;
`;

const InnerWrapper = styled.div`
  position: relative;
  height: 100%;
  margin: auto;
  border-style: solid;
  border-color: ${COLORS.gray[500]};
  border-radius: 100px;
  background: rgba(0, 0, 0, 0.2);
`;

const HandleWrapper = styled.div`
  transition: transform 300ms;
`;

export default Toggle;
