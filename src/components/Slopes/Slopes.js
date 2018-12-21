// @flow
import React from 'react';
import styled from 'styled-components';

import useWindowDimensions from '../../hooks/window-dimensions.hook';
import { COLORS } from '../../constants';

import { SlopesProvider } from './SlopesState';
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
          <CanvasWrapper>
            <SlopesCanvas width={canvasWidth} height={canvasHeight} />
          </CanvasWrapper>

          <SlopesControls width={600} />
        </InnerWrapper>
      </OuterWrapper>

      <SlopesExport width={exportWidth} height={exportHeight} />
    </SlopesProvider>
  );
};

const OuterWrapper = styled.div`
  background: ${COLORS.gray[700]};
`;

const InnerWrapper = styled.div`
  display: flex;
  max-width: 1400px;
  margin: auto;
`;

const CanvasWrapper = styled.div`
  padding: 2rem;
  flex: 1;
  text-align: center;
`;

export default Slopes;
