// @flow
import React from 'react';
import styled from 'styled-components';

import { UNIT } from '../../../constants';

import BulbToggle from './BulbToggle';
import MarginsToggle from './MarginsToggle';
import Spacer from '../../Spacer';

import { SlopesContext } from '../SlopesState';

import type { ToggleParameter } from '../SlopesState';

const ACTION_SIZE = 38;

type Props = {
  enableDarkMode: boolean,
  enableMargins: boolean,
  toggleParameter: ToggleParameter,
};

const PageCluster = ({ enableDarkMode, enableMargins, toggleParameter }) => (
  <Wrapper>
    <BulbToggle
      size={ACTION_SIZE}
      isActive={enableDarkMode}
      handleToggle={() => toggleParameter('enableDarkMode')}
    />

    <Spacer size={UNIT} />

    <MarginsToggle
      size={ACTION_SIZE}
      isActive={enableMargins}
      handleToggle={() => toggleParameter('enableMargins')}
    />
  </Wrapper>
);

// $FlowIgnore
const OptimizedPageCluster = React.memo(PageCluster);

const PageContainer = () => {
  const slopesParams = React.useContext(SlopesContext);

  return (
    <OptimizedPageCluster
      enableDarkMode={slopesParams.enableDarkMode}
      enableMargins={slopesParams.enableMargins}
      toggleParameter={slopesParams.toggleParameter}
    />
  );
};

const Wrapper = styled.div`
  display: flex;
`;

export default PageContainer;
