// @flow
import React from 'react';
import FileSaver from 'file-saver';
import { renderPolylines } from '../../vendor/polylines';

import { getRenderOptions } from '../Slopes/SlopesCanvas.helpers';
import generator from '../Slopes/Slopes.generator';
import { SlopesContext } from '../Slopes/SlopesState';
import transformParameters from '../Slopes/Slopes.params';

import Shelf from '../Shelf';
import Heading from '../Heading';

type Props = {
  isVisible: boolean,
  handleToggle: () => void,
  lineData: any,
};

const DownloadShelf = ({ isVisible, handleToggle, lineData }: Props) => {
  // TODO: Should this be tweakable?
  const width = 5400;
  const height = 7200;

  const slopesParams = React.useContext(SlopesContext);

  React.useEffect(
    () => {
      if (isVisible) {
        // Construct the canvas for download
        const canvasEl = document.createElement('canvas');
        canvasEl.setAttribute('width', String(width));
        canvasEl.setAttribute('height', String(height));

        const context = canvasEl.getContext('2d');

        const drawingVariables = transformParameters({
          height,
          ...slopesParams,
        });

        let data = {
          width,
          height,
          kind: 'main',
          supportsOffscreenCanvas: false,
          scaleRatio: 1,
          devicePixelRatio: window.devicePixelRatio,
          ...drawingVariables,
        };

        const rows = generator(data);

        renderPolylines(
          rows,
          getRenderOptions(
            width,
            height,
            'main',
            context,
            window.devicePixelRatio,
            1,
            data
          )
        );

        canvasEl.toBlob(function(blob) {
          FileSaver.saveAs(blob, 'pretty image.png');
        });
      }
    },
    [isVisible]
  );
  return (
    <Shelf isVisible={isVisible} handleToggle={handleToggle}>
      <Heading size={3}>Download</Heading>
      Blablabla
    </Shelf>
  );
};

export default DownloadShelf;
