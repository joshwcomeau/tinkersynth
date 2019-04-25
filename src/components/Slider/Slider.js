// @flow
import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as actions from '../../actions';
import { COLORS } from '../../constants';
import { clamp, normalize } from '../../utils';
import useBoundingBox from '../../hooks/bounding-box.hook';

import RectangularHandle from '../RectangularHandle';
import Decorations from './Decorations';
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
  isMachineBroken: boolean,
  breakMachineWithKeyboard: (ev: HTMLElement) => void,
  canBreakOutOfRangeOnKeyboard: boolean,
};

const HANDLE_BUFFER = 2;

// All sliders expect values to be between 0 and 100
const min = 0;
const max = 100;

// The keyboard can sometimes be used to push outside the custom range.
// Currently this is set to 10 on each end (so the range is -10 to 110)
const MAX_BREAKOUT = 16;

const Slider = ({
  value,
  updateValue,
  width,
  height,
  handleWidth = 30,
  handleHeight = 21,
  isDisabled,
  isMachineBroken,
  breakMachineWithKeyboard,
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
    const clientY =
      typeof ev.clientY === 'number' ? ev.clientY : ev.touches[0].clientY;

    const deltaY = clientY - sliderBoundingBox.top;
    const value = clamp(deltaY / height, 0, 1);

    const normalizedValue = normalize(value, 0, 1, max, min);

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

  const handleMarginLeft = (width - handleWidth) / 2;
  const handleMarginTop = -handleHeight / 2;

  const handleDisplacement = normalize(value, min, max, height, 0);
  const handleColor = isDisabled ? COLORS.gray[500] : COLORS.pink[300];

  const handleMouseDown = ev => {
    ev.stopPropagation();

    if (isDisabled) {
      return;
    }

    setAnimateTransition(false);

    setDragging(true);
  };

  const numOfNotches = Math.round(height / 6);

  return (
    <Wrapper ref={sliderRef} style={{ width, height }} onClick={updatePosition}>
      <Decorations value={value} height={height} numOfNotches={numOfNotches} />

      <HandleWrapper
        ref={handleRef}
        tabIndex={isDisabled ? -1 : undefined}
        onTouchStart={handleMouseDown}
        onMouseDown={handleMouseDown}
        onKeyDown={ev => {
          // Allow keyboard navigators to break out of the range by 20% in
          // either direction :o this is an easter egg!
          let hasBrokenOutOfRange = false;

          if (ev.key === 'ArrowUp') {
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
          } else if (ev.key === 'ArrowDown') {
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

          if (!isMachineBroken && hasBrokenOutOfRange && handleRef.current) {
            // Mark the machine as "broken".
            // This just displays a toast for the user, and keeps track of
            // that state, so that we don't keep showing them the toast.
            breakMachineWithKeyboard(handleRef.current);
          }
        }}
        style={{
          width: handleWidth,
          height: handleHeight,
          left: handleMarginLeft,
          top: handleMarginTop,
          // Invisible padding, to make it easier to click
          padding: HANDLE_BUFFER,
          // We have to undo that padding in transform: translate, as well as apply
          // the displacement.
          transform: `translate(
            ${-HANDLE_BUFFER}px,
            ${handleDisplacement - HANDLE_BUFFER}px
          )`,
          transition: `transform ${animateTransition ? 250 : 0}ms`,
          cursor: isDisabled ? 'not-allowed' : dragging ? 'grabbing' : 'grab',
        }}
      >
        <RectangularHandle
          width={handleWidth}
          height={handleHeight}
          color={handleColor}
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
  /* Don't scroll while dragging handle */
  touch-action: none;

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

const mapStateToProps = state => {
  const isMachineBroken = state.machine.hasBeenBroken;

  return { isMachineBroken };
};

const mapDispatchToProps = {
  breakMachineWithKeyboard: actions.breakMachineWithKeyboard,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Slider);
