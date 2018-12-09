// @flow
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { polylinesToSVG } from '../../vendor/polylines';

import generator from './Slopes.generator';
import transformParameters from './Slopes.params';

type Props = {
  width: number,
  height: number,
  topMargin: number,
  leftMargin: number,
  perspective: number,
  spikyness: number,
};

const SlopesExport = ({
  width,
  height,
  topMargin,
  leftMargin,
  perspective,
  spikyness,
}: Props) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.addEventListener('keydown', ev => {
      // For now, we'll use the shortcut "Cmd+S" to trigger.
      if (ev.key === 's' && ev.metaKey) {
        ev.preventDefault();
        setShowModal(true);
        return;
      }

      if (ev.key === 'Escape') {
        ev.preventDefault();
        setShowModal(false);
        return;
      }
    });
  }, []);

  if (!showModal) {
    return null;
  }

  const { distanceBetweenRows, perlinRatio } = transformParameters({
    height,
    perspective,
    spikyness,
  });

  const lines = generator({
    width,
    height,
    margins: [topMargin, leftMargin],
    distanceBetweenRows,
    perlinRatio,
  });

  const svgMarkup = polylinesToSVG(lines, { width, height });

  return (
    <Wrapper>
      <Backdrop onClick={() => setShowModal(false)} />
      <Modal>
        <Svg
          width={width / 2}
          height={height / 2}
          viewBox={`0 0 ${width} ${height}`}
          dangerouslySetInnerHTML={{ __html: svgMarkup }}
        />
      </Modal>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background: rgba(40, 40, 40, 0.4);
  cursor: pointer;
`;

const Modal = styled.div`
  position: relative;
  z-index: 2;
  max-width: 600px;
  background: #fff;
  box-shadow: 0px 10px 75px rgba(0, 0, 0, 0.1);
`;

const Svg = styled.svg``;

export default SlopesExport;
