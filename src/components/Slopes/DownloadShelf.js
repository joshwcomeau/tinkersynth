// @flow
import React from 'react';
import styled from 'styled-components';
import svgToPng from '../../vendor/svg-to-png';

import useWindowDimensions from '../../hooks/window-dimensions.hook';
import useWorker from '../../hooks/worker.hook.js';
import { COLORS, UNIT } from '../../constants';
import ccLicenseSrc from '../../images/cc-license.png';
import { getSwatchById } from '../../services/art-swatches.service';
import { renderPolylines } from '../../services/polylines.service';
import generateRandomName from '../../services/random-name.service';

import Shelf from '../Shelf';
import Heading from '../Heading';
import Spacer from '../Spacer';
import TextLink from '../TextLink';
import Paragraph from '../Paragraph';

import { getCanvasDimensions } from './SlopesCanvas.helpers';
import generator from './Slopes.generator';
import { SLOPES_ASPECT_RATIO } from './Slopes.constants';
import { SlopesContext } from './SlopesState';
import DownloadShelfWorker from './DownloadShelf.worker';
import DownloadVariant from './DownloadVariant';

type Props = {
  isVisible: boolean,
  handleToggle: () => void,
};

const PREVIEW_SIZE = 180;

const DownloadShelf = ({ isVisible, handleToggle }: Props) => {
  const windowDimensions = useWindowDimensions();
  const canvasDimensions = getCanvasDimensions(windowDimensions);
  const [filename, setFilename] = React.useState(null);

  const timeoutId = React.useRef(null);

  // TODO: Should this be tweakable?
  const outputWidth = 5400;
  const outputHeight = 7200;

  const slopesParams = React.useContext(SlopesContext);

  const [svgNode, setSvgNode] = React.useState(null);

  const swatch = getSwatchById(slopesParams.swatchId);

  const worker = useWorker(DownloadShelfWorker);

  worker.onmessage = ({ data }) => {
    const { markup } = data;

    const parent = document.createElement('div');
    parent.innerHTML = markup;
    setSvgNode(parent.firstChild);
  };

  React.useEffect(
    () => {
      window.clearTimeout(timeoutId.current);

      if (isVisible) {
        setFilename(generateRandomName());

        const relevantParams = { ...slopesParams };
        delete relevantParams.disabledParams;
        delete relevantParams.shuffle;
        delete relevantParams.toggleMachinePower;
        delete relevantParams.toggleParameter;
        delete relevantParams.tweakParameter;

        let messageData = {
          canvasDimensions,
          params: relevantParams,
        };

        worker.postMessage(messageData);
      } else {
        // Wait until the animation completes
        timeoutId.current = window.setTimeout(() => {
          if (svgNode) {
            svgNode.remove();
            setSvgNode(null);
          }
        }, 600);
      }
    },
    [isVisible]
  );

  React.useEffect(() => () => window.clearTimeout(timeoutId.current));

  return (
    <Shelf isVisible={isVisible} handleToggle={handleToggle}>
      <Wrapper>
        <Info>
          <InfoHeader>
            <Heading size={3}>Download</Heading>
          </InfoHeader>
          <Paragraph>
            Tinkersynth works can now be downloaded for free! Choose the format
            that works best for you.
            <br />
            <TextLink target="_blank" to="/faq?q=formats">
              Learn more about the options
            </TextLink>
            .
          </Paragraph>

          <Spacer size={UNIT * 2} />

          <Paragraph style={{ fontSize: 16 }}>
            Licensed under <strong>CC Attribution-NonCommercial 4.0</strong>.
            <br />
            Please use them in your personal artistic endeavours, or contact us
            for commercial license pricing.
            <br />
            <TextLink to="/faq?q=license" target="_blank">
              More information
            </TextLink>
            .
          </Paragraph>

          <TextLink to="https://creativecommons.org/licenses/by-nc/4.0/">
            <img src={ccLicenseSrc} />
          </TextLink>
        </Info>

        <Spacer size={24} />

        <Downloads>
          <DownloadHeader>
            <Heading size={5}>Click to download:</Heading>
          </DownloadHeader>
          <Variants>
            <DownloadVariant
              size={PREVIEW_SIZE}
              originalCanvasWidth={canvasDimensions.width}
              svgNode={svgNode}
              kind="opaque-png"
              filename={filename}
              swatch={swatch}
            />

            <Spacer size={16} />

            <DownloadVariant
              size={PREVIEW_SIZE}
              originalCanvasWidth={canvasDimensions.width}
              svgNode={svgNode}
              kind="transparent-png"
              filename={filename}
              swatch={swatch}
            />

            <Spacer size={16} />

            <DownloadVariant
              size={PREVIEW_SIZE}
              originalCanvasWidth={canvasDimensions.width}
              svgNode={svgNode}
              kind="svg"
              filename={filename}
              swatch={swatch}
            />
          </Variants>
        </Downloads>
      </Wrapper>
    </Shelf>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  max-height: 70vh;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    overflow: scroll;
    padding-bottom: 24px; /* Allow space for shadows, etc */
  }
`;

const Info = styled.div`
  flex: 1;

  @media (max-width: 1024px) {
    margin-bottom: 24px;
  }
`;

const InfoHeader = styled.header`
  margin-bottom: ${UNIT * 4}px;
`;

const Downloads = styled.div``;
const DownloadHeader = styled.header`
  text-align: center;
  margin-bottom: ${UNIT * 4}px;
`;

const Variants = styled.div`
  display: flex;

  @media (max-width: 550px) {
    flex-direction: column;
    align-items: center;
  }
`;

export default DownloadShelf;
