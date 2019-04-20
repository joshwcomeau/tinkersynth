// @flow
import React from 'react';
import styled from 'styled-components';
import FileSaver from 'file-saver';
import svgToPng from '../../vendor/svg-to-png';
import { renderPolylines, polylinesToSVG } from '../../vendor/polylines';

import useWindowDimensions from '../../hooks/window-dimensions.hook';
import {
  getCanvasDimensions,
  getRenderOptions,
} from '../Slopes/SlopesCanvas.helpers';
import generator from '../Slopes/Slopes.generator';
import { SLOPES_ASPECT_RATIO } from '../Slopes/Slopes.constants';
import { SlopesContext } from '../Slopes/SlopesState';
import transformParameters from '../Slopes/Slopes.params';

import Shelf from '../Shelf';
import Heading from '../Heading';
import MaxWidthWrapper from '../MaxWidthWrapper';

type Props = {
  isVisible: boolean,
  handleToggle: () => void,
  lineData: any,
};

const PREVIEW_HEIGHT = 240;
const PREVIEW_WIDTH = PREVIEW_HEIGHT * SLOPES_ASPECT_RATIO;

const DownloadShelf = ({ isVisible, handleToggle, lineData }: Props) => {
  const windowDimensions = useWindowDimensions();
  const canvasDimensions = getCanvasDimensions(windowDimensions);

  // TODO: Should this be tweakable?
  const outputWidth = 5400;
  const outputHeight = 7200;

  const previewWidth = 180;
  const previewHeight = previewWidth * (4 / 3);

  const slopesParams = React.useContext(SlopesContext);

  const [svgMarkup, setSvgMarkup] = React.useState(null);
  const [previewUri, setPreviewUri] = React.useState(null);

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

        const parent = document.createElement('div');
        parent.innerHTML = markup;
        const svgNode = parent.firstChild;

        // We want to scale up the raster image
        const previewScale = previewHeight / canvasDimensions.height;

        svgToPng.svgAsPngUri(svgNode, { scale: previewScale }, uri => {
          setPreviewUri(uri);
        });

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
      <Wrapper>
        <Info>
          <Heading size={3}>Download</Heading>
        </Info>

        <Downloads>
          <Previews>
            <PreviewImage src={previewUri} />
            <PreviewImage src={previewUri} />
            <PreviewImage src={previewUri} />
          </Previews>
        </Downloads>
      </Wrapper>
    </Shelf>
  );
};

const Wrapper = styled(MaxWidthWrapper)`
  display: flex;
`;

const Info = styled.div`
  flex: 1;
`;

const Downloads = styled.div``;

const Previews = styled.div`
  display: flex;
`;

const PreviewImage = styled.img`
  display: block;
  margin-right: 24px;
  width: ${PREVIEW_WIDTH}px;
  height: ${PREVIEW_HEIGHT}px;

  &:last-of-type {
    margin-right: 0px;
  }
`;

export default DownloadShelf;
