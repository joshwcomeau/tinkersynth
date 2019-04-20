// @flow
import React from 'react';
import FileSaver from 'file-saver';
import { renderPolylines, polylinesToSVG } from '../../vendor/polylines';

import useWindowDimensions from '../../hooks/window-dimensions.hook';
import {
  getCanvasDimensions,
  getRenderOptions,
} from '../Slopes/SlopesCanvas.helpers';
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
  const windowDimensions = useWindowDimensions();
  const canvasDimensions = getCanvasDimensions(windowDimensions);

  // TODO: Should this be tweakable?
  const outputWidth = 5400;
  const outputHeight = 7200;

  const slopesParams = React.useContext(SlopesContext);

  const [svgMarkup, setSvgMarkup] = React.useState(null);

  React.useEffect(
    () => {
      if (isVisible) {
        const drawingVariables = transformParameters({
          ...canvasDimensions,
          ...slopesParams,
        });

        let data = {
          ...canvasDimensions,
          ...drawingVariables,
        };

        const rows = generator(data);

        const renderOptions = getRenderOptions(
          canvasDimensions.width,
          canvasDimensions.height,
          'download-opaque',
          window.devicePixelRatio,
          data
        );

        // Create vector (SVG) markup.
        // We'll use this for the raster format as well, to guarantee
        // consistency between both.
        const markup = polylinesToSVG(rows, renderOptions);

        setSvgMarkup(markup);

        //

        // Construct the canvas for download
        // const canvasEl = document.createElement('canvas');
        // canvasEl.setAttribute('width', String(outputWidth));
        // canvasEl.setAttribute('height', String(outputHeight));

        // const context = canvasEl.getContext('2d');

        // renderPolylines(
        //   rows,

        // );

        // canvasEl.toBlob(function(blob) {
        //   FileSaver.saveAs(blob, 'pretty image.png');
        // });
      }
    },
    [isVisible]
  );
  return (
    <Shelf isVisible={isVisible} handleToggle={handleToggle}>
      <Heading size={3}>Download</Heading>
      <div dangerouslySetInnerHTML={{ __html: svgMarkup }} />
    </Shelf>
  );
};

export default DownloadShelf;
