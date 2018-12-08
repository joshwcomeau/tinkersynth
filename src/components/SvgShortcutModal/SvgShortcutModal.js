// @flow
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { polylinesToSVG } from '../../vendor/polylines';

const SvgShortcutModal = ({ lines, width, height }) => {
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

export default SvgShortcutModal;
