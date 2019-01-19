import React from 'react';
import styled from 'styled-components';

import { UNIT } from '../../constants';

import BulbToggle from '../BulbToggle';
import MarginsToggle from '../MarginsToggle';
import Spacer from '../Spacer';
import { SlopesContext } from './SlopesState';

const ACTION_SIZE = 38;

const SlopesCanvasActions = () => {
  const slopesParams = React.useContext(SlopesContext);

  return (
    <Wrapper>
      <BulbToggle
        size={ACTION_SIZE}
        enableDarkMode={slopesParams.enableDarkMode}
        toggleDarkMode={slopesParams.toggleDarkMode}
      />

      <Spacer size={UNIT} />

      <MarginsToggle
        size={ACTION_SIZE}
        enableMargins={slopesParams.enableMargins}
        toggleMargins={slopesParams.toggleMargins}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

export default SlopesCanvasActions;
