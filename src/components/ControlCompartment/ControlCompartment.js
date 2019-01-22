// @flow
import React, { useRef } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring/hooks';

import { COLORS } from '../../constants';

type Props = {
  orientation: 'horizontal' | 'vertical',
  isDisabled: boolean,
};

const getDoorTranslateString = (offset, orientation, doorIndex) => {
  const translate = orientation === 'horizontal' ? 'translateY' : 'translateX';
  const doorSpecificOffset = doorIndex === 0 ? offset * -1 : offset;

  return `${translate}(${doorSpecificOffset}%)`;
};

const getDoorBorderRadius = (orientation, doorIndex) => {
  const RADIUS = '4px';

  return orientation === 'horizontal'
    ? doorIndex === 0
      ? `${RADIUS} ${RADIUS} 0 0`
      : `0 0 ${RADIUS} ${RADIUS}`
    : doorIndex === 0
    ? `${RADIUS} 0 0 ${RADIUS}`
    : `0 ${RADIUS} ${RADIUS} 0`;
};

const ControlCompartment = ({ orientation, isDisabled, children }: Props) => {
  const wrapperRef = useRef(null);

  const doorSpring = useSpring({
    offset: isDisabled ? 0 : 150,
    config: {
      stiffness: 10,
      friction: 40,
    },
  });

  const childSpring = useSpring({
    scale: isDisabled ? 0.9 : 1,
    opacity: isDisabled ? 1 : 0,
    config: {
      stiffness: 20,
      friction: 30,
    },
  });

  return (
    <Wrapper ref={wrapperRef}>
      <Doors
        orientation={orientation}
        style={{
          pointerEvents: isDisabled ? 'auto' : 'none',
        }}
      >
        <FirstDoor
          style={{
            borderRadius: getDoorBorderRadius(orientation, 0),
            transform: doorSpring.offset.interpolate(offset =>
              getDoorTranslateString(offset, orientation, 0)
            ),
          }}
        >
          Control Disabled
        </FirstDoor>
        <LastDoor
          style={{
            borderRadius: getDoorBorderRadius(orientation, 1),
            transform: doorSpring.offset.interpolate(offset =>
              getDoorTranslateString(offset, orientation, 1)
            ),
          }}
        >
          {/* TODO */}
        </LastDoor>
      </Doors>

      <ChildrenShadow
        style={{ opacity: childSpring.opacity.interpolate(opacity => opacity) }}
      />

      <Children
        style={{
          transform: childSpring.scale.interpolate(
            scale => `scale(${scale}, ${scale})`
          ),
        }}
      >
        {children}
      </Children>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  background: ${COLORS.gray[900]};
  border-radius: 4px;
`;

const Doors = styled.div`
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  display: flex;
  flex-direction: ${props =>
    props.orientation === 'horizontal' ? 'column' : 'row'};
`;

const Door = styled(animated.div)`
  background: ${COLORS.gray[100]};
  border: 1px solid ${COLORS.gray[300]};
  flex: 1;
`;

const FirstDoor = styled(Door)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  font-weight: 600;
  color: ${COLORS.gray[500]};
  text-transform: uppercase;
  border-bottom-color: ${COLORS.gray[500]};
`;
const LastDoor = styled(Door)`
  display: flex;
  border-top-width: 0px;
`;

const Children = styled(animated.div)`
  position: relative;
  z-index: 1;
`;

const ChildrenShadow = styled(animated.div)`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 4px;
  background: #000;
  pointer-events: none;
`;

export default ControlCompartment;
