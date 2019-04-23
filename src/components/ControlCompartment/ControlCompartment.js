// @flow
import React, { useRef } from 'react';
import styled from 'styled-components';
import { Tooltip } from 'react-tippy';
import { useSpring, animated } from 'react-spring/hooks';
import Icon from 'react-icons-kit';
import { alertCircle } from 'react-icons-kit/feather/alertCircle';

import { COLORS } from '../../constants';

import UnstyledButton from '../UnstyledButton';
import Spacer from '../Spacer';

type Props = {
  orientation: 'horizontal' | 'vertical',
  numOfDoors?: 1 | 2,
  isDisabled: boolean,
  children: React$Node,
};

const RADIUS = '3px';

const getDoorTranslateString = (offset, orientation, numOfDoors, doorIndex) => {
  const translate = orientation === 'horizontal' ? 'translateY' : 'translateX';

  const doorSpecificOffset = doorIndex === 0 ? offset * -1 : offset;

  return `${translate}(${doorSpecificOffset}%)`;
};

const getDoorBorderRadius = (orientation, doorIndex) => {
  return orientation === 'horizontal'
    ? doorIndex === 0
      ? `${RADIUS} ${RADIUS} 0 0`
      : `0 0 ${RADIUS} ${RADIUS}`
    : doorIndex === 0
    ? `${RADIUS} 0 0 ${RADIUS}`
    : `0 ${RADIUS} ${RADIUS} 0`;
};

const ControlCompartment = ({
  orientation,
  isDisabled,
  numOfDoors = 2,
  children,
}: Props) => {
  const iconButtonRef = useRef();

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
      friction: 40,
    },
  });

  return (
    <Wrapper>
      <Doors
        orientation={orientation}
        style={{
          pointerEvents: isDisabled ? 'auto' : 'none',
        }}
      >
        <FirstDoor
          style={{
            borderRadius: getDoorBorderRadius(orientation, 0),
            borderBottomColor: numOfDoors === 2 && COLORS.gray[500],
            transform: doorSpring.offset.interpolate(offset =>
              getDoorTranslateString(offset, orientation, numOfDoors, 0)
            ),
          }}
        >
          <Tooltip
            interactiveBorder={10}
            animation="fade"
            duration={200}
            tabIndex={isDisabled ? 0 : -1}
            animateFill={false}
            followCursor={true}
            arrow={true}
            html={
              <>
                This control is disabled because it doesn't do anything with
                current settings.
                <br />
                <Spacer size={8} />
                Try tweaking other parameters to unlock this one!
              </>
            }
            style={{
              lineHeight: 1.4,
            }}
          >
            <Icon icon={alertCircle} />
          </Tooltip>
        </FirstDoor>
        {numOfDoors === 2 && (
          <LastDoor
            style={{
              borderRadius: getDoorBorderRadius(orientation, 1),
              transform: doorSpring.offset.interpolate(offset =>
                getDoorTranslateString(offset, orientation, numOfDoors, 1)
              ),
            }}
          >
            {/* TODO */}
          </LastDoor>
        )}
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
  display: block;
  z-index: 3;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  display: flex;
  border-radius: ${RADIUS};
  flex-direction: ${props =>
    props.orientation === 'horizontal' ? 'column' : 'row'};
`;

const Door = styled(animated.div)`
  background: ${COLORS.gray[100]};
  border: 1px solid ${COLORS.gray[500]};
  flex: 1;
`;

const FirstDoor = styled(Door)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${COLORS.gray[500]};
  text-transform: uppercase;
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
