// @flow
import React from 'react';
import styled from 'styled-components';

import { UNIT } from '../../../constants';

import BulbToggle from './BulbToggle';
import MarginsToggle from './MarginsToggle';
import Spacer from '../../Spacer';

import { SlopesContext } from '../SlopesState';

import type { ToggleParameter } from '../SlopesState';

type Props = {
  size: number,
  enableDarkMode: boolean,
  enableMargins: boolean,
  isPoweredOn: boolean,
  toggleParameter: ToggleParameter,
};

const PageCluster = ({
  size,
  enableDarkMode,
  enableMargins,
  isPoweredOn,
  toggleParameter,
}) => (
  <Wrapper>
    <BulbToggle
      size={size}
      isActive={enableDarkMode}
      isPoweredOn={isPoweredOn}
      handleToggle={() => toggleParameter('enableDarkMode')}
    />

    <Spacer size={UNIT} />

    <MarginsToggle
      size={size}
      isActive={enableMargins}
      isPoweredOn={isPoweredOn}
      handleToggle={() => toggleParameter('enableMargins')}
    />
  </Wrapper>
);

// $FlowIgnore
const OptimizedPageCluster = React.memo(PageCluster);

const PageContainer = ({ size }) => {
  const slopesParams = React.useContext(SlopesContext);

  return (
    <OptimizedPageCluster
      size={size}
      enableDarkMode={slopesParams.enableDarkMode}
      enableMargins={slopesParams.enableMargins}
      isPoweredOn={slopesParams.isPoweredOn}
      toggleParameter={slopesParams.toggleParameter}
    />
  );
};

const Wrapper = styled.div`
  display: flex;
`;

export default PageContainer;
