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
  isDisabled: boolean,
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

  // HACK: RoundHandle needs a unique ID for color-change support.
  // Create a random one on mount, use throughout lifecycle.
  const randomId = React.useRef(
    `toggle-id-${Math.round(Math.random() * 100000000)}`
  );

  return (
    <Button
      tabIndex={isDisabled ? -1 : 0}
      onMouseDown={() => {
        if (isDisabled) {
          return;
        }

        handleToggle(!isToggled);
      }}
      onKeyPress={ev => {
        if (isDisabled) {
          return;
        }

        if (ev.key === 'Enter') {
          handleToggle(!isToggled);
        }
      }}
      style={{ width, height, cursor: isDisabled && 'not-allowed' }}
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
          <RoundHandle
            id={randomId.current}
            size={handleSize}
            innerColor={isDisabled ? COLORS.gray[500] : COLORS.pink[300]}
            outerColor={isDisabled ? COLORS.gray[700] : COLORS.pink[500]}
          />
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
