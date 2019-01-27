// @flow
import React from 'react';
import { Spring } from 'react-spring';

import Debounce from '../Debounce';
import { SlopesContext } from './SlopesState';
import SlopesCanvas from './SlopesCanvas';
import SlopesCanvasMargins from './SlopesCanvasMargins';
import HangingCanvas from '../HangingCanvas';

import type { CanvasSize } from '../../types';

const PREVIEW_SIZES = {
  small: { width: 171, height: 221 },
  medium: { width: 231, height: 299 },
  large: { width: 294, height: 380 },
};

type Props = {
  size: CanvasSize,
};

const SlopesCanvasPreview = ({ size }: Props) => {
  const slopesParams = React.useContext(SlopesContext);

  const { enableMargins, enableDarkMode } = slopesParams;

  const { width, height } = PREVIEW_SIZES[size];

  return (
    <Debounce length={1000}>
      <HangingCanvas size={size} enableDarkMode={enableDarkMode}>
        <SlopesCanvasMargins
          width={width}
          height={height}
          enableMargins={enableMargins}
          enableDarkMode={enableDarkMode}
        />
        <SlopesCanvas {...slopesParams} width={width} height={height} />
      </HangingCanvas>
    </Debounce>
  );
};

export default SlopesCanvasPreview;
