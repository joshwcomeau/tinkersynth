import React from 'react';
import styled from 'styled-components';

import SlopesPlacard from '../SlopesPlacard';
import HiddenCluster from './HiddenCluster';

import type { ToggleParameterAction } from '../SlopesState';

type Props = {
  width: number,
  height: number,
  enableMirrored: boolean,
  toggleParameter: ToggleParameterAction,
};

const PlacardArea = ({ width, height }: Props) => {
  return (
    <Wrapper>
      <PlacardWrapper>
        <SlopesPlacard />
      </PlacardWrapper>

      <HiddenClusterWrapper>
        <HiddenCluster width={146} height={60} />
      </HiddenClusterWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  height: 77px;
`;

const PlacardWrapper = styled.div`
  position: absolute;
  z-index: 2;
`;
const HiddenClusterWrapper = styled.div`
  position: relative;
  padding-top: 15px;
  z-index: 1;
`;

export default PlacardArea;
