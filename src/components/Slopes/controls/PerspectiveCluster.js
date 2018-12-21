// @flow
import React, { useContext } from 'react';

import { InstrumentCluster } from '../../ControlPanel';
import SliderControl from '../../SliderControl';
import { SlopesContext } from '../SlopesState';

const PerspectiveCluster = ({ width }) => {
  const slopesParams = useContext(SlopesContext);

  console.log(width);

  return (
    <InstrumentCluster>
      <SliderControl
        value={slopesParams.perspective}
        updateValue={slopesParams.setPerspective}
        min={0}
        max={100}
        width={width}
        height={140}
        renderVisualization={value => <div>{value}</div>}
      />
    </InstrumentCluster>
  );
};

export default PerspectiveCluster;
