// @flow
import React, { useState } from 'react';
import styled from 'styled-components';

import Slopes from '../Slopes';
import SlopesControls from '../SlopesControls';

const SlopesContainer = () => {
  // High-level "Parameters", tweakable settings
  const [perspective, setPerspective] = useState(3);
  const [spikyness, setSpikyness] = useState(0);

  return (
    <Wrapper>
      <Slopes perspective={perspective} spikyness={spikyness} />
      <SlopesControls
        perspective={perspective}
        spikyness={spikyness}
        setPerspective={setPerspective}
        setSpikyness={setSpikyness}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

export default SlopesContainer;
