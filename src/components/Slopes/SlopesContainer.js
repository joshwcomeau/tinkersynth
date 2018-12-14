// @flow
import React, { useState } from 'react';
import styled from 'styled-components';
import { Spring } from 'react-spring';

import useWindowDimensions from '../../hooks/window-dimensions.hook';

import SlopesCanvas from './SlopesCanvas';
import SlopesControls from './SlopesControls';
import SlopesExport from './SlopesExport';

const SlopesContainer = () => {
  // TODO: Use these for something
  const windowDimensions = useWindowDimensions();

  // We want our canvas to be an 8.5" x 11" piece of paper, with a 1" margin
  // all-around.
  const canvasHeight = 11 * 50;
  const canvasWidth = 8.5 * 50;

  const exportHeight = windowDimensions.height;
  const exportWidth = exportHeight * (8.5 / 11);

  // High-level "Parameters", tweakable settings
  const [perspective, setPerspective] = useState(30);
  const [spikyness, setSpikyness] = useState(0);
  const [polarAmount, setPolarAmount] = useState(0);

  const params = { perspective, spikyness, polarAmount };

  return (
    <Spring to={params}>
      {interpolatedParams => (
        <>
          <Wrapper>
            <SlopesCanvas
              {...interpolatedParams}
              width={canvasWidth}
              height={canvasHeight}
            />
            <SlopesControls
              {...params}
              setPerspective={setPerspective}
              setSpikyness={setSpikyness}
              setPolarAmount={setPolarAmount}
            />
          </Wrapper>
          <SlopesExport {...params} width={exportWidth} height={exportHeight} />
        </>
      )}
    </Spring>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

export default SlopesContainer;
