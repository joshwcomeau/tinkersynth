// @flow
import React from 'react';
import styled from 'styled-components';

import { UNIT } from '../../../constants';

import ColorPicker from '../../ColorPicker';
import Spacer from '../../Spacer';

import { SlopesContext } from '../SlopesState';

import type { TweakParameterAction } from '../SlopesState';

type Props = {
  size: number,
  swatchId: string,
  isPoweredOn: boolean,
  animateTransitions: boolean,
  tweakParameter: TweakParameterAction,
};

const ColorCluster = ({
  size,
  swatchId,
  isPoweredOn,
  animateTransitions,
  tweakParameter,
}) => (
  <Wrapper>
    <ColorPicker
      swatchId={swatchId}
      size={size}
      isAnimated={animateTransitions}
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
      animateTransitions={slopesParams.animateTransitions}
    />
  );
};

const Wrapper = styled.div`
  display: flex;
`;

export default PageContainer;
