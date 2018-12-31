// @flow
import React, { useContext } from 'react';

import { UNIT } from '../../../constants';

import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';
import TouchSliderIconControl from '../../TouchSliderIconControl';

import SplitUniverseVisualization from './SplitUniverseVisualization';

type Props = {
  width: number,
};

const DestructionCluster = ({ width }: Props) => {
  const slopesParams = useContext(SlopesContext);

  const OUTER_BORDER_WIDTH = 1;
  const innerWidth = width - UNIT * 2 - OUTER_BORDER_WIDTH * 2;

  return (
    <InstrumentCluster>
      <TouchSliderIconControl
        value={slopesParams.splitUniverse}
        updateValue={slopesParams.setSplitUniverse}
        width={innerWidth}
        height={40}
        visualizationComponent={SplitUniverseVisualization}
      />
    </InstrumentCluster>
  );
};

export default DestructionCluster;
