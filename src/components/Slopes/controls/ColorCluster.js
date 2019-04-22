// @flow
import React from 'react';
import styled from 'styled-components';

import { UNIT } from '../../../constants';

import ColorPicker from '../../ColorPicker';
import Spacer from '../../Spacer';

import { SlopesContext } from '../SlopesState';

import type { Colors } from '../../../types';
import type { ToggleParameterAction } from '../SlopesState';

type Props = {
  size: number,
  selectedSwatchId: string,
  isPoweredOn: boolean,
  toggleParameter: ToggleParameterAction,
};

const ColorCluster = ({
  size,
  selectedSwatchId,
  isPoweredOn,
  toggleParameter,
}) => (
  <Wrapper>
    <ColorPicker size={size} />
  </Wrapper>
);

// $FlowIgnore
const OptimizedColorCluster = React.memo(ColorCluster);

const PageContainer = ({ size }: { size: number }) => {
  const slopesParams = React.useContext(SlopesContext);

  return (
    <OptimizedColorCluster
      size={size}
      selectedSwatchId="red-aqua" // TEMP!
      isPoweredOn={slopesParams.isPoweredOn}
      toggleParameter={slopesParams.toggleParameter}
    />
  );
};

const Wrapper = styled.div`
  display: flex;
`;

export default PageContainer;
