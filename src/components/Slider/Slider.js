// @flow
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';
import { clamp, normalize } from '../../utils';
import useBoundingBox from '../../hooks/bounding-box.hook';

import RectangularHandle from '../RectangularHandle';
import Notches from './Notches';

type Props = {
  // Sliders work on a scale of 0-1
  value: number,
  updateValue: (num: number) => void,
  min?: number,
  max?: number,

  // Horizontal not yet supported
  orientation?: 'vertical',
  width?: number,
  height?: number,
  numOfNotches?: number,
};

const HANDLE_BUFFER = 6;

const Slider = ({
  value,
  updateValue,
  min = 0,
  max = 1,
  orientation = 'vertical',
  width,
  height,
  numOfNotches = 18,
  handleWidth = 30,
  handleHeight = 21,
}: Props) => {
  const [dragging, setDragging] = useState(false);
  const [sliderRef, sliderBoundingBox] = useBoundingBox();

  useEffect(
    () => {
      if (!dragging) {
        return;
      }

      document.body.style.cursor = 'grabbing';

      const handleMouseUp = () => {
        setDragging(false);
      };

      window.addEventListener('mouseup', handleMouseUp);

      const handleMouseMove = ({ clientY }) => {
        const deltaY = clientY - sliderBoundingBox.top;
        const value = clamp(deltaY / height, 0, 1);

        const normalizedValue = normalize(value, 0, 1, max, min);

        updateValue(normalizedValue);
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        document.body.style.cursor = null;

        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('mousemove', handleMouseMove);
      };
    },
    [dragging]
  );

  const handleMarginLeft = (width - handleWidth) / 2;
  const handleMarginTop = -handleHeight / 2;

  const handleDisplacement = normalize(value, min, max, height, 0);

  return (
    <Wrapper ref={sliderRef} style={{ width, height }}>
      <Decorations>
        <Notches num={numOfNotches} position="left" />
        <Track />
        <Notches num={numOfNotches} position="right" />
      </Decorations>

      <HandleWrapper
        onMouseDown={ev => setDragging(true)}
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
          cursor: dragging ? 'grabbing' : 'grab',
        }}
      >
        <RectangularHandle
          width={handleWidth}
          height={handleHeight}
          color={COLORS.pink[300]}
        />
      </HandleWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  border-radius: 3px;
`;

const HandleWrapper = styled.button`
  position: absolute;
  border: none;
  background: transparent;
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

const Decorations = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
`;

const Track = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  width: 2px;
  height: 100%;
  background: ${COLORS.gray[100]};
  border-radius: 2px;
`;

export default React.memo(Slider);
