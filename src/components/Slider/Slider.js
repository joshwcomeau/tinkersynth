// @flow
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { clamp, normalize } from '../../utils';
import useBoundingBox from '../../hooks/bounding-box.hook';

import Handle from './Handle';
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
  background?: string,
};

const Slider = ({
  value,
  updateValue,
  min = 0,
  max = 1,
  orientation = 'vertical',
  width = 14,
  height = 90,
  numOfNotches = 15,
  handleWidth = 21,
  handleHeight = 14,
  background = '#DEDEDE',
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

  const handleMouseDown = ev => {
    setDragging(true);
  };

  const handleDisplacement = normalize(value, min, max, height, 0);

  return (
    <Wrapper ref={sliderRef} style={{ width, height, background }}>
      <Notches num={numOfNotches} />
      <Handle
        displacement={handleDisplacement}
        width={handleWidth}
        height={handleHeight}
        style={{ left: handleMarginLeft, top: handleMarginTop }}
        onMouseDown={handleMouseDown}
        dragging={dragging}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  border-radius: 3px;
`;

export default React.memo(Slider);
