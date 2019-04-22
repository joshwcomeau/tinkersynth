// @flow
import React from 'react';
import styled from 'styled-components';

import { UNIT } from '../../../constants';

import Swatch from '../../Swatch';
import Spacer from '../../Spacer';

import { SlopesContext } from '../SlopesState';

import type { Colors } from '../../../types';
import type { ToggleParameterAction } from '../SlopesState';

type Props = {
  size: number,
  colors: Colors,
  isPoweredOn: boolean,
  toggleParameter: ToggleParameterAction,
};

const ColorCluster = ({ size, colors, isPoweredOn, toggleParameter }) => (
  <Wrapper>
    <Swatch size={size} colors={colors} isSelected={true} />
  </Wrapper>
);

// $FlowIgnore
const OptimizedColorCluster = React.memo(ColorCluster);

const PageContainer = ({ size }: { size: number }) => {
  const slopesParams = React.useContext(SlopesContext);

  // TEMP
  const colors = {
    backgroundColor: '#000000',
    foregroundColors: ['#FF0000', '#00FFFF'],
  };

  return (
    <OptimizedColorCluster
      size={size}
      colors={colors}
      isPoweredOn={slopesParams.isPoweredOn}
      toggleParameter={slopesParams.toggleParameter}
    />
  );
};

const Wrapper = styled.div`
  display: flex;
`;

export default PageContainer;
