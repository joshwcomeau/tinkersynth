// @flow
import React from 'react';
import styled, { keyframes } from 'styled-components';
import Icon from 'react-icons-kit';
import { loader } from 'react-icons-kit/feather/loader';
import svgToPng from '../../vendor/svg-to-png';

import generateRandomName from '../../services/random-name.service';
import {
  renderPolylines,
  polylinesToSVG,
} from '../../services/polylines.service';
import darkTilesSrc from '../../images/transparent-tiles-dark.svg';
import lightTilesSrc from '../../images/transparent-tiles-light.svg';

import UnstyledButton from '../UnstyledButton';
import Spin from '../Spin';

import { SLOPES_ASPECT_RATIO } from './Slopes.constants';

import type { SwatchData } from '../../types';

type Props = {
  size: number,
  originalCanvasWidth: number,
  svgNode: ?HTMLElement,
  kind: 'transparent-png' | 'opaque-png' | 'svg',
  filename: string,
  swatch: SwatchData,
};

const OUTPUT_HEIGHT = 7200;
const OUTPUT_WIDTH = OUTPUT_HEIGHT * SLOPES_ASPECT_RATIO;

const generateOpaqueClone = (svgNode, originalCanvasWidth, background) => {
  // Ok this one is a bit tricky. We need to modify the SVG to include a
  // full-size background.
  const svgWidth = originalCanvasWidth;
  const svgHeight = svgWidth * (1 / SLOPES_ASPECT_RATIO);

  const nodeClone = svgNode.cloneNode(true);

  const rect = document.createElement('rect');
  rect.setAttribute('x', '0');
  rect.setAttribute('y', '0');
  rect.setAttribute('width', svgWidth);
  rect.setAttribute('height', svgHeight);
  rect.setAttribute('fill', background);

  nodeClone.prepend(rect);

  return nodeClone;
};

const DownloadVariant = ({
  size,
  originalCanvasWidth,
  svgNode,
  kind,
  filename,
  swatch,
}: Props) => {
  const [previewUri, setPreviewUri] = React.useState(null);
  const [isPreparing, setIsPreparing] = React.useState(false);

  // NOTE: Since most backgrounds are dark, I'm just assuming that we only
  // consider '#FFF' a light background. Ideally, though, we should be smarter,
  // maybe convert the color to HSL and look at lightness?
  const isLightBackground = swatch.backgroundColor === '#FFFFFF';
  const textColor = isLightBackground ? 'black' : 'white';

  const background =
    kind === 'transparent-png'
      ? isLightBackground
        ? `url(${lightTilesSrc})`
        : `url(${darkTilesSrc})`
      : swatch.backgroundColor;

  React.useEffect(
    () => {
      // When the download shelf is hidden, we unset the SVG node.
      // We want to remove our preview, so that we don't show stale previews
      // the next time the shelf is opened.
      if (!svgNode) {
        setPreviewUri(null);
        return;
      }

      const previewScale = size / originalCanvasWidth;

      svgToPng.svgAsPngUri(svgNode, { scale: previewScale }, uri => {
        setPreviewUri(uri);
      });
    },
    [svgNode]
  );

  const handleClick = () => {
    const scale = OUTPUT_WIDTH / originalCanvasWidth;

    switch (kind) {
      case 'transparent-png': {
        setIsPreparing(true);

        const fullPath = `${filename} (transparent).png`;

        svgToPng
          .saveSvgAsPng(svgNode, fullPath, { scale })
          .then(() => setIsPreparing(false));

        break;
      }

      case 'opaque-png': {
        setIsPreparing(true);

        const opaqueClone = generateOpaqueClone(
          svgNode,
          originalCanvasWidth,
          background
        );

        const fullPath = `${filename} (opaque).png`;

        svgToPng
          .saveSvgAsPng(opaqueClone, fullPath, { scale })
          .then(() => setIsPreparing(false));

        break;
      }

      case 'svg': {
        const opaqueClone = generateOpaqueClone(
          svgNode,
          originalCanvasWidth,
          background
        );

        const fullPath = `${filename}.svg`;

        svgToPng.saveSvg(opaqueClone, fullPath);
        break;
      }

      default: {
        throw new Error('Unrecognized kind: ' + kind);
      }
    }
  };

  let label;
  let sublabel = '';
  switch (kind) {
    case 'svg': {
      label = 'SVG';
      break;
    }

    case 'transparent-png': {
      label = 'PNG';
      sublabel = 'transparent';
      break;
    }
    case 'opaque-png': {
      label = 'PNG';
      sublabel = 'opaque';
      break;
    }
  }

  return (
    <Wrapper
      style={{ width: size, height: size * (4 / 3), background }}
      disabled={isPreparing}
      onClick={() =>
        handleClick(
          filename.current,
          kind,
          originalCanvasWidth,
          background,
          svgNode
        )
      }
      onContextMenu={ev => {
        ev.preventDefault();

        handleClick(
          filename.current,
          kind,
          originalCanvasWidth,
          background,
          svgNode
        );
      }}
    >
      {previewUri && <PreviewImage src={previewUri} />}

      {isPreparing && (
        <IconWrapper
          style={{
            color: textColor,
          }}
        >
          <Spin>
            <Icon icon={loader} size={32} />
          </Spin>
        </IconWrapper>
      )}

      <Overlay
        style={{
          color: textColor,
          textShadow: !isLightBackground && '1px 1px 0px rgba(0, 0, 0, 0.5)',
        }}
      >
        <Label>{label}</Label>
      </Overlay>
    </Wrapper>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9, 0.9);
  }

  to {
    opacity: 1;
    transform: scale(1, 1);
  }
`;

const Wrapper = styled(UnstyledButton)`
  position: relative;
  border-radius: 2px;
  overflow: hidden; /* For the border radius */
  border: 3px solid #fff;
  transition: 300ms;
  will-change: transform;

  &:hover {
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.35);
    transform: translateY(-3px);
  }

  &:disabled {
    opacity: 0.7;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 32px;
  height: 32px;
  margin: auto;
`;

const Overlay = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  text-align: center;
`;

const Label = styled.div`
  font-size: 42px;
  font-weight: 900;
  letter-spacing: -0.5px;
  margin-bottom: 16px;
`;

const Sublabel = styled.div`
  font-size: 21px;
  font-weight: 600;
  transform: translateY(8px);
`;

const PreviewImage = styled.img`
  position: relative;
  z-index: 1;
  display: block;
  object-fit: cover;
  width: 100%;
  height: calc(100% - 4px);
  animation: ${fadeIn} 300ms ease-out;
`;

// $FlowIgnore
export default React.memo(DownloadVariant);
