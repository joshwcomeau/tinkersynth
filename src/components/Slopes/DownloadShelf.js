// @flow
import React from 'react';
import styled from 'styled-components';
import svgToPng from '../../vendor/svg-to-png';
import { renderPolylines, polylinesToSVG } from '../../vendor/polylines';

import useWindowDimensions from '../../hooks/window-dimensions.hook';
import useWorker from '../../hooks/worker.hook.js';
import { COLORS, UNIT } from '../../constants';
import ccLicenseSrc from '../../images/cc-license.png';

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
  lineData: any,
};

const PREVIEW_SIZE = 180;

const DownloadShelf = ({ isVisible, handleToggle, lineData }: Props) => {
  const windowDimensions = useWindowDimensions();
  const canvasDimensions = getCanvasDimensions(windowDimensions);

  const timeoutId = React.useRef(null);

  // TODO: Should this be tweakable?
  const outputWidth = 5400;
  const outputHeight = 7200;

  const slopesParams = React.useContext(SlopesContext);

  const [svgNode, setSvgNode] = React.useState(null);

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
            <TextLink target="_blank" to="/faq#formats">
              Learn more about the options
            </TextLink>
            .
          </Paragraph>

          <Spacer size={UNIT * 2} />

          <Paragraph style={{ fontSize: 16 }}>
            Licensed under <strong>CC Attribution-NonCommercial 4.0</strong>.
            Please use them in your non-commercial artistic endeavours, or
            contact us for pricing.
            <br />
            <TextLink to="/faq#license" target="_blank">
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
              enableDarkMode={slopesParams.enableDarkMode}
            />

            <Spacer size={24} />

            <DownloadVariant
              size={PREVIEW_SIZE}
              originalCanvasWidth={canvasDimensions.width}
              svgNode={svgNode}
              kind="transparent-png"
              enableDarkMode={slopesParams.enableDarkMode}
            />

            <Spacer size={24} />

            <DownloadVariant
              size={PREVIEW_SIZE}
              originalCanvasWidth={canvasDimensions.width}
              svgNode={svgNode}
              kind="svg"
              enableDarkMode={slopesParams.enableDarkMode}
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
`;

const Info = styled.div`
  flex: 1;
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
`;

export default DownloadShelf;
