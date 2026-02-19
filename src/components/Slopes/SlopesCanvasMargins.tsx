import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring/hooks';

import { getMarginSize } from './Slopes.helpers';

const ACTION_SIZE = 38;

const SlopesCanvasMargins = ({ width, height, backgroundColor }) => {
  const marginSize = getMarginSize(height);

  return (
    <>
      <TopMargin
        style={{
          height: marginSize,
          backgroundColor,
        }}
      />
      <LeftMargin
        style={{
          width: marginSize,
          backgroundColor,
        }}
      />
      <RightMargin
        style={{
          width: marginSize,
          backgroundColor,
        }}
      />
      <BottomMargin
        style={{
          height: marginSize,
          backgroundColor,
        }}
      />
    </>
  );
};

const Margin = styled(animated.div)`
  position: absolute;
  z-index: 2;
`;

const TopMargin = styled(Margin)`
  top: 0;
  left: 0;
  right: 0;
  transform-origin: top center;
`;
const LeftMargin = styled(Margin)`
  top: 0;
  left: 0;
  bottom: 0;
  transform-origin: center left;
`;
const RightMargin = styled(Margin)`
  top: 0;
  right: 0;
  bottom: 0;
  transform-origin: center right;
`;
const BottomMargin = styled(Margin)`
  left: 0;
  right: 0;
  bottom: 0;
  transform-origin: bottom center;
`;

export default SlopesCanvasMargins;
