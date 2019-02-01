import React from 'react';
import styled from 'styled-components';

import { SlopesContext } from '../SlopesState';
import SlopesPlacard from '../SlopesPlacard';
import HiddenControl from './HiddenControl';
import { InstrumentCluster } from '../../ControlPanel';

import type { ToggleParameterAction } from '../SlopesState';

type Props = {
  width: number,
  height: number,
  enableMirrored: boolean,
  toggleParameter: ToggleParameterAction,
};

const PlacardCluster = ({ width, height }: Props) => {
  return (
    <Wrapper>
      <PlacardWrapper>
        <SlopesPlacard />
      </PlacardWrapper>

      <HiddenControlWrapper>
        <HiddenControl width={150} height={62} />
      </HiddenControlWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const PlacardWrapper = styled.div`
  position: absolute;
  z-index: 2;
`;
const HiddenControlWrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 150px;
  height: 70px;
`;

const OptimizedPlacardCluster = React.memo(PlacardCluster);

const PlacardClusterContainer = ({ width, height }) => {
  const slopesParams = React.useContext(SlopesContext);

  return (
    <OptimizedPlacardCluster
      width={width}
      height={height}
      enableMirrored={slopesParams.enableMirrored}
      toggleParameter={slopesParams.toggleParameter}
    />
  );
};

export default PlacardClusterContainer;
