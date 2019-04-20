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
  const outputWidth = 5400;
  const outputHeight = 7200;

  const slopesParams = React.useContext(SlopesContext);

  React.useEffect(
    () => {
      if (isVisible) {
        // Construct the canvas for download
        const canvasEl = document.createElement('canvas');
        canvasEl.setAttribute('width', String(outputWidth));
        canvasEl.setAttribute('height', String(outputHeight));

        const context = canvasEl.getContext('2d');

        const drawingVariables = transformParameters({
          height: outputHeight,
          ...slopesParams,
        });

        let data = {
          width: outputWidth,
          height: outputHeight,
          ...drawingVariables,
        };

        const rows = generator(data);

        renderPolylines(
          rows,
          getRenderOptions(
            outputWidth,
            outputHeight,
            'download-opaque',
            context,
            window.devicePixelRatio,
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
