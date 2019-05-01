import React from 'react';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import { chevronUp } from 'react-icons-kit/feather/chevronUp';
import { chevronDown } from 'react-icons-kit/feather/chevronDown';
import { useSpring, animated } from 'react-spring/hooks';
import { Tooltip } from 'react-tippy';

import { COLORS } from '../../constants';
import artSwatches from '../../services/art-swatches.service.js';

import Swatch from '../Swatch';
import UnstyledButton from '../UnstyledButton';

const ColorPicker = ({ size, swatchId, isAnimated, updateValue }) => {
  let swatchIndex = artSwatches.findIndex(swatch => swatch.id === swatchId);

  if (swatchIndex === -1) {
    swatchIndex = 0;
  }

  const swatch = artSwatches[swatchIndex];

  const swatchWrapperHeight = size * 0.7;
  const initialPadding = (size - swatchWrapperHeight) / 2;

  const swatchHeight = swatchWrapperHeight - 8;

  const offsetY = swatchIndex * swatchWrapperHeight * -1;

  const spring = useSpring({
    transform: `translateY(${offsetY}px)`,
    immediate: !isAnimated,
  });

  const incrementBy = amount => () => {
    let nextIndex = swatchIndex + amount;

    // Allow the user to cycle past the end, back to the beginning.
    if (nextIndex === artSwatches.length) {
      nextIndex = 0;
    } else if (nextIndex < 0) {
      nextIndex = artSwatches.length - 1;
    }

    updateValue(artSwatches[nextIndex].id);
  };

  const increment = incrementBy(1);
  const decrement = incrementBy(-1);

  return (
    <Wrapper style={{ width: size * 1.5, height: size }}>
      <Tooltip
        interactiveBorder={10}
        animation="fade"
        duration={200}
        tabIndex={0}
        animateFill={false}
        followCursor={false}
        arrow={true}
        html={swatch.label}
        style={{
          lineHeight: 1.4,
        }}
      >
        {/*
        NOTE: Putting a click-handler on a div because it is unnecessary for
        keyboard users. It does the same thing as the 'down' arrow, so it's
        just a redundant focus-snatcher. Adding the click handler because
        sometimes mouse users will click it.
      */}
        <VisualizationWrapper onClick={increment}>
          <Gradient />
          <Swatches style={{ paddingTop: initialPadding }}>
            {artSwatches.map(swatch => (
              <SwatchWrapper
                key={swatch.id}
                style={{
                  width: size,
                  height: swatchWrapperHeight,
                  ...spring,
                }}
              >
                <Swatch
                  size={swatchHeight}
                  swatch={swatch}
                  isSelected={swatch.id === swatchId}
                  isAnimated={isAnimated}
                />
              </SwatchWrapper>
            ))}
          </Swatches>
        </VisualizationWrapper>
      </Tooltip>
      <Controls style={{ width: size / 2 }}>
        <IncrementDecrementButton
          style={{ width: size / 2, height: size / 2 }}
          onClick={decrement}
        >
          <Icon icon={chevronUp} size={16} />
        </IncrementDecrementButton>
        <IncrementDecrementButton
          style={{ width: size / 2, height: size / 2 }}
          onClick={increment}
        >
          <Icon icon={chevronDown} size={16} />
        </IncrementDecrementButton>
      </Controls>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  background: ${COLORS.gray[900]};
  border-radius: 4px;
  overflow: hidden;
  display: flex;

  &:disabled {
    cursor: not-allowed;
  }
`;

const VisualizationWrapper = styled.div`
  flex: 1;
`;

const Swatches = styled.div`
  position: relative;
`;

const SwatchWrapper = styled(animated.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  will-change: transform;
`;

const Controls = styled.div`
  position: relative;
  z-index: 3;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: ${COLORS.gray[1000]};
`;

const Gradient = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.35) 0%,
    rgba(0, 0, 0, 0) 35%,
    rgba(0, 0, 0, 0) 70%,
    rgba(0, 0, 0, 0.35) 100%
  );
  pointer-events: none;
`;

const IncrementDecrementButton = styled(UnstyledButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;

  &:active {
    background: ${COLORS.pink[300]};
  }

  &:disabled {
    cursor: default;
    opacity: 0;
  }

  & svg {
    display: block !important;
  }
`;

export default ColorPicker;
