// @flow
import React, { useContext } from 'react';

import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';
import BezierControl from '../../BezierControl';

const PerspectiveCluster = ({ width }) => {
  const slopesParams = useContext(SlopesContext);

  const bezierControlWidth = width;
  const bezierControlHeight = bezierControlWidth;

  return (
    <InstrumentCluster>
      <BezierControl
        points={slopesParams.peaksCurve}
        updatePoint={slopesParams.updatePointInPeaksCurve}
        min={0}
        max={100}
        width={bezierControlWidth}
        height={bezierControlHeight}
      />
    </InstrumentCluster>
  );
};

export default PerspectiveCluster;
