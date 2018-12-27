// @flow
import React, { useContext } from 'react';

import { UNIT } from '../../../constants';

import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';
import SliderVideoControl from '../../SliderVideoControl';
import ToggleControl from '../../ToggleControl';
import Spacer from '../../Spacer';
import Column from '../../Column';
import PerspectiveVisualization from './PerspectiveVisualization';
import OcclusionVisualization from './OcclusionVisualization';
import LineBoostVisualization from './LineBoostVisualization';

const PerspectiveCluster = ({ width }) => {
  const slopesParams = useContext(SlopesContext);

  const innerWidth = width - UNIT * 2 - 2;

  const videoSliderHeight = 130;

  // Our toggleControl should use up half of the available vertical space,
  // minus the UNIT of padding separating the two.
  const toggleControlSize = (videoSliderHeight - UNIT) / 2;
  const videoSliderWidth = innerWidth - toggleControlSize - UNIT;

  return (
    <InstrumentCluster>
      <SliderVideoControl
        value={slopesParams.perspective}
        updateValue={slopesParams.setPerspective}
        min={0}
        max={100}
        width={videoSliderWidth}
        height={videoSliderHeight}
        renderVisualization={props => <PerspectiveVisualization {...props} />}
      />
      <Spacer size={UNIT} />
      <Column>
        <ToggleControl
          width={toggleControlSize}
          height={toggleControlSize}
          value={slopesParams.enableOcclusion}
          updateValue={slopesParams.setEnableOcclusion}
          renderVisualization={props => <OcclusionVisualization {...props} />}
        />
        <ToggleControl
          width={toggleControlSize}
          height={toggleControlSize}
          value={slopesParams.enableLineBoost}
          updateValue={slopesParams.setEnableLineBoost}
          renderVisualization={props => <LineBoostVisualization {...props} />}
        />
      </Column>
    </InstrumentCluster>
  );
};

export default PerspectiveCluster;
