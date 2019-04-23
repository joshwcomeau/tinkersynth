import React from 'react';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import { chevronUp } from 'react-icons-kit/feather/chevronUp';
import { chevronDown } from 'react-icons-kit/feather/chevronDown';
import { useSpring, animated } from 'react-spring/hooks';

import { COLORS } from '../../constants';
import artSwatches from '../../services/art-swatches.service.js';

import Swatch from '../Swatch';
import UnstyledButton from '../UnstyledButton';

const ColorPicker = ({ size, swatchId, updateValue }) => {
  const swatchIndex = artSwatches.findIndex(swatch => swatch.id === swatchId);

  const swatchWrapperHeight = size * 0.7;
  const initialPadding = (size - swatchWrapperHeight) / 2;

  const swatchHeight = swatchWrapperHeight - 8;

  const offsetY = swatchIndex * swatchWrapperHeight * -1;

  const spring = useSpring({
    transform: `translateY(${offsetY}px)`,
  });

  return (
    <Wrapper style={{ width: size * 1.5, height: size }}>
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
            />
          </SwatchWrapper>
        ))}
      </Swatches>

      <Controls style={{ width: size / 2 }}>
        <IncrementDecrementButton
          style={{ width: size / 2, height: size / 2 }}
          disabled={swatchIndex === 0}
          onClick={() => updateValue(artSwatches[swatchIndex - 1].id)}
        >
          <Icon icon={chevronUp} size={16} />
        </IncrementDecrementButton>
        <IncrementDecrementButton
          style={{ width: size / 2, height: size / 2 }}
          disabled={swatchIndex === artSwatches.length - 1}
          onClick={() => updateValue(artSwatches[swatchIndex + 1].id)}
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

const Swatches = styled.div`
  position: relative;
  flex: 1;
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
