// @flow
import React from 'react';
import styled from 'styled-components';
import { Spring } from 'react-spring';

import Debounce from '../Debounce';
import { SlopesContext } from './SlopesState';
import SlopesCanvas from './SlopesCanvas';
import SlopesCanvasMargins from './SlopesCanvasMargins';
import HangingCanvas from '../HangingCanvas';

import type { CanvasSize } from '../../types';

const PREVIEW_SIZE_INFO = {
  small: { scaledHeight: 210, aspectRatio: 0.66666666 },
  medium: { scaledHeight: 280, aspectRatio: 0.75 },
  large: { scaledHeight: 420, aspectRatio: 0.66666666 },
};

const ACTUAL_HEIGHT = 552;

type Props = {
  size: CanvasSize,
};

const SlopesCanvasPreview = ({ size }: Props) => {
  const slopesParams = React.useContext(SlopesContext);

  const { enableMargins, enableDarkMode } = slopesParams;

  const { scaledHeight, aspectRatio } = PREVIEW_SIZE_INFO[size];

  const scaleRatio = scaledHeight / ACTUAL_HEIGHT;

  const width = ACTUAL_HEIGHT * aspectRatio;

  return (
    <Debounce length={1400}>
      <Wrapper
        style={{
          transform: `scale(${scaleRatio}, ${scaleRatio})`,
          transformOrigin: 'center center',
        }}
      >
        <HangingCanvas
          size={size}
          scaleRatio={scaleRatio}
          enableDarkMode={enableDarkMode}
        >
          <SlopesCanvasMargins
            width={width}
            height={ACTUAL_HEIGHT}
            enableMargins={enableMargins}
            enableDarkMode={enableDarkMode}
          />
          <SlopesCanvas
            {...slopesParams}
            scaleRatio={scaleRatio}
            width={width}
            height={ACTUAL_HEIGHT}
          />
        </HangingCanvas>
      </Wrapper>
    </Debounce>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  z-index: 2;
`;

export default SlopesCanvasPreview;
