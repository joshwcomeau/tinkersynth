// @flow
import React, { useState } from 'react';
import styled from 'styled-components';

import Slopes from '../Slopes';
import SlopesControls from '../SlopesControls';

const SlopesContainer = () => {
  // High-level "Parameters", tweakable settings
  const [perspective, setPerspective] = useState(3);

  return (
    <Wrapper>
      <Slopes perspective={perspective} />
      <SlopesControls
        perspective={perspective}
        setPerspective={setPerspective}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

export default SlopesContainer;
