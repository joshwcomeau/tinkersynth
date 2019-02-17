// @flow
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import {
  COLORS,
  UNIT,
  DARK_BACKGROUND,
  LIGHT_BACKGROUND,
} from '../../constants';

import CanvasFrame from '../CanvasFrame';

import type { CanvasSize } from '../../types';

type Props = {
  size: CanvasSize,
  scaleRatio: number,
  enableDarkMode: boolean,
  children: React$Node,
};

const FRAME_OFFSETS = {
  small: { top: -130, left: 140 },
  medium: { top: -80, left: 80 },
  large: { top: -50, left: 100 },
};

const calculateOffset = frameBoundingBox => {
  const windowWidth = window.innerWidth;

  // On mount, we figure out where the center of our frame is.
  // Our frame's size can change, but for now I think I can just worry about
  // the largest one, and have some extra padding for smaller ones.
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
  scaleRatio,
  enableDarkMode,
  children,
}: Props) => {
  const defaultOffset = 0;
  const [offset, setOffset] = useState(defaultOffset);
  const frameRef = useRef(null);

  const backgroundColor = enableDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND;

  const frameOffset = FRAME_OFFSETS[size];

  const borderWidth = 6 * (1 / scaleRatio);
  const padding = 5 * (1 / scaleRatio);

  return (
    <Frame
      ref={frameRef}
      style={{
        ...frameOffset,
        borderWidth,
        padding,
        transform: `translateX(-${offset}px)`,
      }}
    >
      <CanvasWrapper
        style={{
          backgroundColor,
          boxShadow: !enableDarkMode && '1px 1px 1px rgba(0, 0, 0, 0.1)',
        }}
      >
        {children}
      </CanvasWrapper>
    </Frame>
  );
};

const Frame = styled(CanvasFrame)`
  position: relative;
  z-index: 2;
`;

const CanvasWrapper = styled.div`
  position: relative;
  padding: 1px;
`;

export default HangingCanvas;
