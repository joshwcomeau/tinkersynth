// @flow
import React from 'react';
import styled from 'styled-components';

import useWindowDimensions from '../../hooks/window-dimensions.hook';
import { COLORS, UNIT } from '../../constants';

import MaxWidthWrapper from '../MaxWidthWrapper';
import CanvasToggle from '../CanvasToggle';
import BulbToggle from '../BulbToggle';

import { SlopesProvider } from './SlopesState';
import SlopesCanvasWrapper from './SlopesCanvasWrapper';
import SlopesCanvas from './SlopesCanvas';
import SlopesControls from './SlopesControls';
import SlopesExport from './SlopesExport';

const Slopes = () => {
  const windowDimensions = useWindowDimensions();

  // We want our canvas to be an 8.5" x 11" piece of paper, with a 1" margin
  // all-around.
  const canvasHeight = 11 * 50;
  const canvasWidth = 8.5 * 50;

  const exportHeight = windowDimensions.height;
  const exportWidth = exportHeight * (8.5 / 11);

  return (
    <SlopesProvider>
      <OuterWrapper>
        <InnerWrapper>
          <SlopesCanvasWrapper
            toggles={
              <>
                <CanvasToggle visualizationComponent={BulbToggle} />
              </>
            }
          >
            <SlopesCanvas width={canvasWidth} height={canvasHeight} />
          </SlopesCanvasWrapper>

          <SlopesControls width={600} />
        </InnerWrapper>
      </OuterWrapper>

      <SlopesExport width={exportWidth} height={exportHeight} />
    </SlopesProvider>
  );
};

const OuterWrapper = styled.div`
  position: relative;
  background: ${COLORS.gray[700]};
  padding-bottom: ${UNIT * 8}px;
`;

const InnerWrapper = styled(MaxWidthWrapper)`
  display: flex;
`;

// const CanvasWrapper = styled.div`
//   padding: 2rem;
//   flex: 1;
//   text-align: center;
// `;

export default Slopes;
