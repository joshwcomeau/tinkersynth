// @flow
import React from 'react';
import styled from 'styled-components';

import useWindowDimensions from '../../hooks/window-dimensions.hook';
import useToggle from '../../hooks/toggle.hook';
import { COLORS, UNIT, HEADER_HEIGHT } from '../../constants';
import { getCanvasDimensions } from './SlopesCanvas.helpers';
import {
  SLOPES_ASPECT_RATIO,
  SLOPES_BREAKPOINTS,
  getSlopesBreakpoint,
} from './Slopes.constants';

import MaxWidthWrapper from '../MaxWidthWrapper';
import LimitedExperienceNotice from '../LimitedExperienceNotice';
import DownloadShelf from './DownloadShelf';
import CanvasToggle from '../CanvasToggle';
import Spacer from '../Spacer';
import SlopesCat from './SlopesCat';
import { SlopesProvider } from './SlopesState';
import SlopesCanvasWrapper from './SlopesCanvasWrapper';
import SlopesCanvasMachine from './SlopesCanvas.machine';
import SlopesControls from './SlopesControls';

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
  const [showDownloadShelf, toggleShowDownloadShelf] = useToggle();

  const windowDimensions = useWindowDimensions();

  // The full experience is only available on desktop.
  // This sad decision is because I don't know how to make the full experience
  // good on smaller screens =(
  const isFullExperience = windowDimensions.width > 450;

  const { width: canvasWidth, height: canvasHeight } = getCanvasDimensions(
    windowDimensions
  );

  const slopesBreakpoint = getSlopesBreakpoint(windowDimensions.width);

  return (
    <SlopesProvider>
      {!isFullExperience && <LimitedExperienceNotice />}

      <MachineWrapper>
        <MainRow
          style={{
            transform: showDownloadShelf ? `scale(0.95, 0.95)` : `scale(1, 1)`,
          }}
        >
          {isFullExperience && (
            <ControlsWrapper>
              <SlopesControls
                key={slopesBreakpoint}
                windowDimensions={windowDimensions}
                width={getMachineWidth(
                  slopesBreakpoint,
                  windowDimensions.width
                )}
              />
            </ControlsWrapper>
          )}

          <SlopesCanvasWrapper
            width={canvasWidth}
            height={canvasHeight}
            key={`${canvasWidth}/${canvasHeight}`}
            isFullExperience={isFullExperience}
            toggleDownloadShelf={toggleShowDownloadShelf}
          >
            <SlopesCanvasMachine
              // Whenever the size changes, we want to redraw the canvas.
              // Easiest way to do this with the web-worker and offscreenCanvas
              // is to just re-mount the component
              key={size}
              width={canvasWidth}
              height={canvasHeight}
            />
          </SlopesCanvasWrapper>

          {isFullExperience && (
            <CatWrapper>
              <SlopesCat />
            </CatWrapper>
          )}
        </MainRow>
      </MachineWrapper>

      <Spacer size={UNIT * 2} />

      <DownloadShelf
        isVisible={showDownloadShelf}
        handleToggle={toggleShowDownloadShelf}
      />
    </SlopesProvider>
  );
};

const MachineWrapper = styled.div`
  position: relative;
  min-height: calc(100vh - ${HEADER_HEIGHT}px);
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
  transition: transform 400ms;
  transform-origin: top center;

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

const CatWrapper = styled.div`
  position: absolute;
  z-index: 10;
  bottom: -16px;
  left: 15%;
`;

export default Slopes;
