import React from 'react';
import styled from 'styled-components';

import BulbToggle from '../BulbToggle';
import Spacer from '../Spacer';
import { SlopesContext } from './SlopesState';

const ACTION_SIZE = 38;

const SlopesCanvasActions = () => {
  const slopesParams = React.useContext(SlopesContext);

  return (
    <Wrapper>
      <BulbToggle
        size={ACTION_SIZE}
        isDarkMode={slopesParams.isDarkMode}
        toggleDarkMode={slopesParams.toggleDarkMode}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

export default SlopesCanvasActions;
