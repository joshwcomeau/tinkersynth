import React from 'react';
import styled from 'styled-components';

import useToggle from '../../../hooks/toggle.hook';

import SlopesPlacard from '../SlopesPlacard';
import HiddenCluster from './HiddenCluster';

type Props = {};

const PlacardArea = ({  }: Props) => {
  const [isHiddenClusterUsable, toggleHiddenCluster] = useToggle(false);

  return (
    <Wrapper>
      <PlacardWrapper
        style={{ pointerEvents: isHiddenClusterUsable ? 'none' : 'auto' }}
      >
        <SlopesPlacard handleRemoval={toggleHiddenCluster} />
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

export default PlacardArea;
