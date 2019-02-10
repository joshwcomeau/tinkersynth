import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring/hooks';

import { UNIT, LIGHT_BACKGROUND, DARK_BACKGROUND } from '../../constants';
import { getMarginSize } from './Slopes.helpers';

const ACTION_SIZE = 38;

const SlopesCanvasMargins = ({
  width,
  height,
  enableMargins,
  enableDarkMode,
}) => {
  const marginSize = getMarginSize(height);

  const spring = useSpring({
    marginScale: enableMargins ? 1 : 0.1,
  });

  return (
    <>
      <TopMargin
        style={{
          height: marginSize,
          background: enableDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
          transform: spring.marginScale.interpolate(
            scale => `scaleY(${scale})`
          ),
        }}
      />
      <LeftMargin
        style={{
          width: marginSize,
          background: enableDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
          transform: spring.marginScale.interpolate(
            scale => `scaleX(${scale})`
          ),
        }}
      />
      <RightMargin
        style={{
          width: marginSize,
          background: enableDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
          transform: spring.marginScale.interpolate(
            scale => `scaleX(${scale})`
          ),
        }}
      />
      <BottomMargin
        style={{
          height: marginSize,
          background: enableDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
          transform: spring.marginScale.interpolate(
            scale => `scaleY(${scale})`
          ),
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
