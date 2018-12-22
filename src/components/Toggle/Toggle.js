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
  const handleSize = height;
  const trackHoleSize = 4;

  const trackWidth = width * 0.35;

  return (
    <Button
      style={{ width, height }}
      onMouseDown={() => handleToggle(!isToggled)}
    >
      <InnerWrapper width={trackWidth}>
        <Track />

        <TrackEdge size={trackHoleSize} style={{ left: -trackHoleSize / 2 }} />
        <TrackEdge
          size={trackHoleSize}
          style={{ left: trackWidth - trackHoleSize / 2 }}
        />

        <HandleWrapper
          size={handleSize}
          style={{
            transform: isToggled
              ? `translateY(-1px) translateX(${trackWidth}px)`
              : 'translateY(-1px) translateX(0px)',
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
  width: ${props => props.width}px;
  height: 100%;
  margin: auto;
`;

const Track = styled.div`
  position: absolute;
  z-index: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  margin: auto;
  background: ${COLORS.gray[100]};
  border-radius: 2px;
`;

const TrackEdge = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  margin: auto;
  background: ${COLORS.gray[100]};
  border-radius: 50%;
  /* transform: translate(-50%, -50%); */
`;

const HandleWrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: ${props => -props.size / 2}px;
  transition: transform 300ms;
`;

export default Toggle;
