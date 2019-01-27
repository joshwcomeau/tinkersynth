// @flow
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import {
  COLORS,
  UNIT,
  DARK_BACKGROUND,
  LIGHT_BACKGROUND,
} from '../../constants';

import type { CanvasSize } from '../../types';

type Props = {
  size: CanvasSize,
  previewSizes: any,
  enableDarkMode: boolean,
  children: React$Node,
};

const FRAME_OFFSETS = {
  small: { top: 150, left: 130 },
  medium: { top: 95, left: 105 },
  large: { top: 40, left: 85 },
};

const calculateOffset = (frameBoundingBox, previewSizes) => {
  const windowWidth = window.innerWidth;

  // On mount, we figure out where the center of our frame is.
  // Our frame's size can change, but for now I think I can just worry about
  // the largest one, and have some extra padding for smaller ones.
  const largestCanvasWidth = 310;
  const buffer = 10;
  const rightmostOffset = frameBoundingBox.right;

  if (windowWidth < rightmostOffset + buffer) {
    return rightmostOffset + buffer - windowWidth;
  } else {
    return 0;
  }
};

const HangingCanvas = ({
  size,
  previewSizes,
  enableDarkMode,
  children,
}: Props) => {
  const [offset, setOffset] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    // Don't worry about this during SSR.
    if (typeof window === 'undefined') {
      return;
    }

    // We should always have a frameRef on mount, but if we don't, this
    // calculation would be moot anyway
    if (!frameRef.current) {
      return;
    }

    const frameBoundingBox = frameRef.current.getBoundingClientRect();

    const nextOffset = calculateOffset(frameBoundingBox);
    if (nextOffset !== offset) {
      setOffset(nextOffset);
    }

    const handleResize = () => {
      const nextOffset = calculateOffset(frameBoundingBox);
      if (nextOffset !== offset) {
        setOffset(nextOffset);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const backgroundColor = enableDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND;

  const frameOffset = FRAME_OFFSETS[size];

  return (
    <Frame
      ref={frameRef}
      style={{
        ...frameOffset,
        transform: `translateX(-${offset}px)`,
      }}
    >
      <CanvasWrapper style={{ backgroundColor }}>{children}</CanvasWrapper>
    </Frame>
  );
};

const Frame = styled.div`
  position: absolute;
  z-index: 2;
  border: 3px solid ${COLORS.gray[900]};
  border-radius: 2px;
`;

const CanvasWrapper = styled.div`
  position: relative;
  border: 5px solid ${COLORS.white};
`;

export default HangingCanvas;
