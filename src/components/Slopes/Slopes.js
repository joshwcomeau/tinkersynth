// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import useWindowDimensions from '../../hooks/window-dimensions.hook';
import { COLORS, UNIT, PRINT_SIZES } from '../../constants';

import MaxWidthWrapper from '../MaxWidthWrapper';
import CanvasToggle from '../CanvasToggle';
import Spacer from '../Spacer';

import { SLOPES_BREAKPOINTS, getSlopesBreakpoint } from './Slopes.constants';
import { SlopesProvider } from './SlopesState';
import SlopesCanvasWrapper from './SlopesCanvasWrapper';
import SlopesCanvasMachine from './SlopesCanvas.machine';
import SlopesControls from './SlopesControls';
import SlopesStorefront from './SlopesStorefront';

const getMachineWidth = (slopesBreakpoint, windowWidth) => {
  switch (slopesBreakpoint) {
    // By default, make it nice and wide
    case 'xlarge':
      return 600;

    // Shrink it a little to fit at 1024x768
    case 'large':
      return 550;

    // Below 1024, the two stack again, so we can widen it up until we hit
    // mobile dimensions
    case 'medium':
      return 620;

    default:
      return windowWidth;
  }
};

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

  const slopesBreakpoint = getSlopesBreakpoint(windowDimensions.width);

  return (
    <SlopesProvider>
      <MachineWrapper>
        <MainRow>
          <ControlsWrapper>
            <Spacer size={UNIT} />
            <SlopesControls
              key={slopesBreakpoint}
              width={getMachineWidth(slopesBreakpoint, windowDimensions.width)}
            />
          </ControlsWrapper>

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
        </MainRow>
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

const MainRow = styled(MaxWidthWrapper)`
  display: flex;
  /*
    Reversing because the DOM order is backwards, with the control panel
    before the canvas. This is to ensure they overlap properly on mobile.
    No fussing with z-indices required!
  */
  flex-direction: row-reverse;
  justify-content: space-between;

  @media (max-width: ${SLOPES_BREAKPOINTS.xlarge}px) {
    padding-left: ${UNIT}px;
    padding-right: ${UNIT}px;
    justify-content: space-around;
  }

  @media (max-width: ${SLOPES_BREAKPOINTS.large}px) {
    padding-left: 0;
    padding-right: 0;
    /* See comment above about row-reverse */
    flex-direction: column-reverse;
    align-items: center;
    padding-top: ${UNIT * 2}px;
  }
`;

const mapStateToProps = state => {
  const { size } = state.store.slopes;

  return {
    size,
  };
};

export default connect(mapStateToProps)(Slopes);
