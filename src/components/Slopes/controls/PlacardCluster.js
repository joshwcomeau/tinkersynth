import React, { useContext } from 'react';
import styled from 'styled-components';

import { UNIT } from '../../../constants';
import slopesPlacardSrc from '../../../images/slopes-placard.svg';

import Spacer from '../../Spacer';
import { SlopesContext } from '../SlopesState';

import type { ToggleParameterAction } from '../SlopesState';

type Props = {
  width: number,
  height: number,
  enableMirrored: boolean,
  toggleParameter: ToggleParameterAction,
};

const PlacardCluster = ({ width, height }: Props) => {
  return <Placard src={slopesPlacardSrc} />;
};

const Placard = styled.img`
  display: block;
  /*
    The placard spills outside the rectangle.
    Do some translating so that the edges line up as expected.
  */
  transform: translate(-2px, 8px);
`;

const OptimizedPlacardCluster = React.memo(PlacardCluster);

const PlacardClusterContainer = ({ width, height }) => {
  const slopesParams = useContext(SlopesContext);

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
