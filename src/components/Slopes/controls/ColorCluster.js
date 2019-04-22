// @flow
import React from 'react';
import styled from 'styled-components';

import { UNIT } from '../../../constants';

import ColorPicker from '../../ColorPicker';
import Spacer from '../../Spacer';

import { SlopesContext } from '../SlopesState';

import type { Colors } from '../../../types';
import type { tweakParameterAction } from '../SlopesState';

type Props = {
  size: number,
  swatchId: string,
  isPoweredOn: boolean,
  tweakParameter: tweakParameterAction,
};

const ColorCluster = ({ size, swatchId, isPoweredOn, tweakParameter }) => (
  <Wrapper>
    <ColorPicker
      swatchId={swatchId}
      size={size}
      updateValue={val => tweakParameter('swatchId', val)}
    />
  </Wrapper>
);

// $FlowIgnore
const OptimizedColorCluster = React.memo(ColorCluster);

const PageContainer = ({ size }: { size: number }) => {
  const slopesParams = React.useContext(SlopesContext);

  return (
    <OptimizedColorCluster
      size={size}
      swatchId={slopesParams.swatchId}
      isPoweredOn={slopesParams.isPoweredOn}
      tweakParameter={slopesParams.tweakParameter}
    />
  );
};

const Wrapper = styled.div`
  display: flex;
`;

export default PageContainer;
