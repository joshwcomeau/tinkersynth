// @flow
import React, { useState } from 'react';
import styled from 'styled-components';

import Slopes from '../Slopes';
import SlopesControls from '../SlopesControls';

const ArtWithControls = () => {
  const [lineDensity, setLineDensity] = useState(3);

  return (
    <Wrapper>
      <Slopes lineDensity={lineDensity} />
      <SlopesControls
        lineDensity={lineDensity}
        setLineDensity={setLineDensity}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

export default ArtWithControls;
