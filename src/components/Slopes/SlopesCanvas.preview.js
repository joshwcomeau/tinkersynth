// @flow
import React from 'react';
import { Spring } from 'react-spring';

import Debounce from '../Debounce';
import { SlopesContext } from './SlopesState';
import SlopesCanvas from './SlopesCanvas';

const SlopesCanvasPreview = ({ width, height }: any) => {
  const slopesParams = React.useContext(SlopesContext);

  return (
    <Debounce length={1000}>
      <SlopesCanvas {...slopesParams} width={width} height={height} />
    </Debounce>
  );
};

export default SlopesCanvasPreview;
