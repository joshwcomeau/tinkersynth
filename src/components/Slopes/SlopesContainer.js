// @flow
import React, { useState } from 'react';
import styled from 'styled-components';

import useWindowDimensions from '../../hooks/window-dimensions.hook';

import SlopesCanvas from './SlopesCanvas';
import SlopesControls from './SlopesControls';
import SlopesExport from './SlopesExport';

const SlopesContainer = () => {
  // TODO: Use these for something
  const windowDimensions = useWindowDimensions();

  // We want our canvas to be an 8.5" x 11" piece of paper, with a 1" margin
  // all-around.
  const canvasWidth = 8.5 * 50;
  const canvasHeight = 11 * 50;
  const topMargin = (canvasHeight / 11) * 1;
  const leftMargin = (canvasWidth / 8.5) * 1;

  // High-level "Parameters", tweakable settings
  const [perspective, setPerspective] = useState(3);
  const [spikyness, setSpikyness] = useState(0);

  const params = { perspective, spikyness };

  return (
    <>
      <Wrapper>
        <SlopesCanvas
          {...params}
          width={canvasWidth}
          height={canvasHeight}
          topMargin={topMargin}
          leftMargin={leftMargin}
        />
        <SlopesControls
          {...params}
          setPerspective={setPerspective}
          setSpikyness={setSpikyness}
        />
      </Wrapper>
      <SlopesExport
        {...params}
        width={canvasWidth}
        height={canvasHeight}
        topMargin={topMargin}
        leftMargin={leftMargin}
      />
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

export default SlopesContainer;
