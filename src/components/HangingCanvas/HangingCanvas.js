// @flow
import React from 'react';
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
  enableDarkMode: boolean,
  children: React$Node,
};

const FRAME_OFFSETS = {
  small: { top: 150, left: 130 },
  medium: { top: 95, left: 105 },
  large: { top: 40, left: 85 },
};

const HangingCanvas = ({ size, enableDarkMode, children }: Props) => {
  const backgroundColor = enableDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND;

  const frameOffset = FRAME_OFFSETS[size];

  return (
    <Frame style={frameOffset}>
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
