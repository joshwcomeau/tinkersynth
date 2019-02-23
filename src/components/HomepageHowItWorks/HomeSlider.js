// @flow
/**
 * This is a copy/paste mess
 */
import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as actions from '../../actions';
import { COLORS } from '../../constants';
import { clamp, normalize } from '../../utils';
import useBoundingBox from '../../hooks/bounding-box.hook';

import RectangularHandle from '../RectangularHandle';
import Decorations from './SliderDecorations';
import UnstyledButton from '../UnstyledButton';

type Props = {
  value: number,
  updateValue: (num: number) => void,
  width: number,
  height: number,
  numOfNotches?: number,
  handleWidth?: number,
  handleHeight?: number,
  isDisabled: boolean,
  canBreakOutOfRangeOnKeyboard: boolean,
};

const HANDLE_BUFFER = 2;

// All sliders expect values to be between 0 and 100
const min = 0;
const max = 100;

// The keyboard can sometimes be used to push outside the custom range.
// Currently this is set to 10 on each end (so the range is -10 to 110)
const MAX_BREAKOUT = 0;

const Slider = ({
  value,
  updateValue,
  width,
  height,
  numOfNotches = 18,
  handleWidth = 20,
  handleHeight = 30,
  isDisabled,
  canBreakOutOfRangeOnKeyboard,
}: Props) => {
  const handleRef = useRef(null);

  const [dragging, setDragging] = useState(false);
  const [animateTransition, setAnimateTransition] = useState(true);

  const [sliderRef, sliderBoundingBox] = useBoundingBox();

  const updatePosition = ev => {
    ev.preventDefault();
    ev.stopPropagation();

    if (!sliderBoundingBox || isDisabled) {
      return;
    }

    // This can either be a mouse or touch event.
    const clientX =
      typeof ev.clientX === 'number' ? ev.clientX : ev.touches[0].clientX;

    const deltaX = clientX - sliderBoundingBox.left;
    const value = clamp(deltaX / width, 0, 1);

    const normalizedValue = normalize(value, 1, 0, max, min);

    updateValue(normalizedValue);
  };

  useEffect(
    () => {
      if (!dragging || !document.body || !sliderBoundingBox) {
        return;
      }

      document.body.style.cursor = 'grabbing';

      const handleMouseUp = () => {
        setDragging(false);
        setAnimateTransition(true);
      };

      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);

      window.addEventListener('mousemove', updatePosition);
      window.addEventListener('touchmove', updatePosition);

      return () => {
        // $FlowIgnore
        document.body.style.cursor = null;

        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchend', handleMouseUp);
        window.removeEventListener('mousemove', updatePosition);
        window.removeEventListener('touchmove', updatePosition);
      };
    },
    [dragging]
  );

  const handleMarginLeft = -handleWidth / 2;

  const handleDisplacement = normalize(value, min, max, 0, width);
  const handleColor = isDisabled ? COLORS.gray[500] : COLORS.pink[300];

  const handleMouseDown = ev => {
    ev.stopPropagation();

    if (isDisabled) {
      return;
    }

    setAnimateTransition(false);

    setDragging(true);
  };

  return (
    <Wrapper ref={sliderRef} style={{ width, height }} onClick={updatePosition}>
      <Decorations numOfNotches={numOfNotches} />

      <HandleWrapper
        ref={handleRef}
        tabIndex={isDisabled ? -1 : undefined}
        onTouchStart={handleMouseDown}
        onMouseDown={handleMouseDown}
        onKeyDown={ev => {
          // Allow keyboard navigators to break out of the range by 20% in
          // either direction :o this is an easter egg!
          let hasBrokenOutOfRange = false;

          if (ev.key === 'ArrowRight') {
            ev.preventDefault();
            ev.stopPropagation();

            const maxValue = canBreakOutOfRangeOnKeyboard
              ? 100 + MAX_BREAKOUT
              : 100;

            if (value < maxValue) {
              const newValue = value + 2;
              updateValue(newValue);

              hasBrokenOutOfRange = newValue > 100;
            }
          } else if (ev.key === 'ArrowLeft') {
            ev.preventDefault();
            ev.stopPropagation();

            const minValue = canBreakOutOfRangeOnKeyboard
              ? 0 - MAX_BREAKOUT
              : 0;

            if (value > minValue) {
              const newValue = value - 2;
              updateValue(newValue);

              hasBrokenOutOfRange = newValue < 0;
            }
          } else if (ev.key === 'Enter') {
            ev.preventDefault();
            ev.stopPropagation();

            if (value > 50) {
              updateValue(0);
            } else {
              updateValue(100);
            }
          }
        }}
        style={{
          width: handleWidth,
          height: height,
          left: handleMarginLeft,
          top: 0,
          bottom: 0,
          marginTop: 'auto',
          marginBottom: 'auto',

          // Invisible padding, to make it easier to click
          padding: HANDLE_BUFFER,
          // We have to undo that padding in transform: translate, as well as apply
          // the displacement.
          transform: `translateX(${handleDisplacement}px)`,
          transition: `transform ${animateTransition ? 250 : 0}ms`,
          cursor: isDisabled ? 'not-allowed' : dragging ? 'grabbing' : 'grab',
        }}
      >
        <Handle
          style={{
            width: handleWidth,
            height: handleHeight,
          }}
        />
      </HandleWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  border-radius: 3px;
`;

const HandleWrapper = styled(UnstyledButton)`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;

  /*
    The wrapper is given some padding, so that user clicks don't have to be
    perfect. It's an invisible barrier around the handle.
    We want this barrier to be considered as part of the width, otherwise it'll
    shrink the actual handle! So we need to ditch border-box
  */
  box-sizing: content-box;

  &:focus:not(.focus-visible) {
    outline: none;
  }
`;

const Handle = styled.div`
  background: ${COLORS.pink[500]};
  border-radius: 5px;
`;

export default Slider;
