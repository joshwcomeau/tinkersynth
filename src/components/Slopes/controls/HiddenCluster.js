// @flow
import React from 'react';

import { UNIT } from '../../../constants';

import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';

type Props = {
  width: number,
  height: number,
};

const HiddenCluster = ({ width, height }: Props) => {
  const innerWidth = width - UNIT * 2;
  const innerHeight = height - UNIT * 2;

  return (
    <InstrumentCluster style={{ borderRadius: 4 }}>
      <div style={{ width: innerWidth, height: innerHeight }} />
    </InstrumentCluster>
  );
};

const OptimizedHiddenCluster = React.memo(HiddenCluster);

const HiddenClusterContainer = ({ width, height }) => {
  const slopesParams = React.useContext(SlopesContext);

  return (
    <OptimizedHiddenCluster
      width={width}
      height={height}
      enableMirrored={slopesParams.enableMirrored}
      toggleParameter={slopesParams.toggleParameter}
    />
  );
};

export default HiddenClusterContainer;
