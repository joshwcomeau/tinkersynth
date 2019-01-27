// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import useWindowDimensions from '../../hooks/window-dimensions.hook';
import { COLORS, UNIT, PRINT_SIZES } from '../../constants';

import MaxWidthWrapper from '../MaxWidthWrapper';
import CanvasToggle from '../CanvasToggle';
import Spacer from '../Spacer';

import { SlopesProvider } from './SlopesState';
import SlopesCanvasWrapper from './SlopesCanvasWrapper';
import SlopesCanvasMachine from './SlopesCanvas.machine';
import SlopesControls from './SlopesControls';
import SlopesStorefront from './SlopesStorefront';

const Slopes = ({ size }) => {
  const { width: printWidth, height: printHeight } = PRINT_SIZES[size];

  const windowDimensions = useWindowDimensions();

  // Our aspect ratio depends on the size selected.
  // By default, our size is 18 x 24.
  const aspectRatio = printWidth / printHeight;

  // By default, canvases are 552px tall.
  // This odd number is a factor of both aspect ratios (0.75 and 0.66).
  // TODO: Should I make this responsive? Shrink when the window is too short?
  const canvasHeight = 552;
  const canvasWidth = canvasHeight * aspectRatio;

  return (
    <SlopesProvider>
      <MachineWrapper>
        <Row>
          <SlopesCanvasWrapper width={canvasWidth} height={canvasHeight}>
            <SlopesCanvasMachine
              // Whenever the size changes, we want to redraw the canvas.
              // Easiest way to do this with the web-worker and offscreenCanvas
              // is to just re-mount the component
              key={size}
              width={canvasWidth}
              height={canvasHeight}
            />
          </SlopesCanvasWrapper>
          <ControlsWrapper>
            <Spacer size={UNIT} />
            <SlopesControls width={600} />
          </ControlsWrapper>
        </Row>
      </MachineWrapper>

      <Spacer size={UNIT * 2} />

      <SlopesStorefront />
    </SlopesProvider>
  );
};

const MachineWrapper = styled.div`
  position: relative;
  background: ${COLORS.gray[700]};
  padding-bottom: ${UNIT * 16}px;
`;

const ControlsWrapper = styled.div`
  display: flex;
`;

const Row = styled(MaxWidthWrapper)`
  display: flex;
  justify-content: space-between;
`;

const mapStateToProps = state => {
  const { size } = state.store.slopes;

  return {
    size,
  };
};

export default connect(mapStateToProps)(Slopes);
