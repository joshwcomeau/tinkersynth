import React from 'react';
import styled from 'styled-components';

import useToggle from '../../../hooks/toggle.hook';

import { SlopesContext } from '../SlopesState';
import SlopesPlacard from '../SlopesPlacard';
import HiddenCluster from './HiddenCluster';

type Props = {
  enableMirrored: boolean,
};

const PlacardArea = ({ enableMirrored }: Props) => {
  const [isHiddenClusterUsable, toggleHiddenCluster] = useToggle(
    enableMirrored
  );

  return (
    <Wrapper>
      <PlacardWrapper
        style={{ pointerEvents: isHiddenClusterUsable ? 'none' : 'auto' }}
      >
        <SlopesPlacard
          handleRemoval={toggleHiddenCluster}
          enableMirrored={enableMirrored}
        />
      </PlacardWrapper>

      <HiddenClusterWrapper>
        <HiddenCluster
          width={146}
          height={60}
          isUsable={isHiddenClusterUsable}
        />
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

const OptimizedPlacardArea = React.memo(PlacardArea);

const PlacardAreaContainer = props => {
  const slopesParams = React.useContext(SlopesContext);

  return (
    <OptimizedPlacardArea
      {...props}
      enableMirrored={slopesParams.enableMirrored}
    />
  );
};

export default PlacardAreaContainer;
