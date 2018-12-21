// @flow
import React, { useContext } from 'react';

import { InstrumentCluster } from '../../ControlPanel';
import SliderControl from '../../SliderControl';
import { SlopesContext } from '../SlopesState';

import PerspectiveVisualization from './PerspectiveVisualization';

const PerspectiveCluster = ({ width }) => {
  const slopesParams = useContext(SlopesContext);

  return (
    <InstrumentCluster>
      <SliderControl
        value={slopesParams.perspective}
        updateValue={slopesParams.setPerspective}
        min={0}
        max={100}
        width={width}
        height={140}
        renderVisualization={props => <PerspectiveVisualization {...props} />}
      />
    </InstrumentCluster>
  );
};

export default PerspectiveCluster;
