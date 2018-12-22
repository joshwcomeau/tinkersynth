// @flow
import React from 'react';
import styled from 'styled-components';

import Handle from './Handle';
import { UNIT } from '../../constants';

type Props = {
  width: number,
  height: number,
  isToggled: boolean,
  handleToggle: (newVal: boolean) => void,
};

const Toggle = ({ width, height, isToggled, handleToggle }: Props) => {
  const handleSize = height;

  const trackWidth = width * 0.35;

  return (
    <Button
      style={{ width, height }}
      onMouseDown={() => handleToggle(!isToggled)}
    >
      <InnerWrapper width={trackWidth}>
        <Track />

        <HandleWrapper
          size={handleSize}
          style={{
            transform: isToggled
              ? `translateX(${trackWidth}px)`
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

  &:focus:not(.focus-visible) {
    outline: none;
  }
`;

const InnerWrapper = styled.div`
  position: relative;
  width: ${props => props.width}px;
  height: 100%;
  margin: auto;
`;

const Track = styled.div`
  position: absolute;
  z-index: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 2px;
`;

const HandleWrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: ${props => -props.size / 2}px;
  transition: transform 300ms;
`;

export default Toggle;
