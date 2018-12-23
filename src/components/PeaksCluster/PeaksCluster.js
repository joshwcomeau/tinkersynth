// @flow
import React, { useContext } from 'react';
import styled from 'styled-components';

import { UNIT } from '../../../constants';

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
        value={slopesParams.perspective}
        updateValue={slopesParams.setPerspective}
        min={0}
        max={100}
        width={videoSliderWidth}
        height={videoSliderHeight}
        renderVisualization={props => <PerspectiveVisualization {...props} />}
      />
    </InstrumentCluster>
  );
};

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default PerspectiveCluster;
