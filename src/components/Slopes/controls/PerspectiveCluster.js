// @flow
import React, { useContext } from 'react';
import styled from 'styled-components';

import { UNIT } from '../../../constants';

import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';
import SliderControl from '../../SliderControl';
import ToggleControl from '../../ToggleControl';
import Spacer from '../../Spacer';
import Column from '../../Column';
import PerspectiveVisualization from './PerspectiveVisualization';
import OcclusionVisualization from './OcclusionVisualization';
import LineBoostVisualization from './LineBoostVisualization';

const PerspectiveCluster = ({ width }) => {
  const slopesParams = useContext(SlopesContext);

  const videoSliderHeight = 130;

  const buttonSize = (videoSliderHeight - UNIT) / 2;
  const videoSliderWidth = width - buttonSize - UNIT * 2;

  return (
    <InstrumentCluster>
      <SliderControl
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
          width={buttonSize}
          height={buttonSize}
          value={slopesParams.enableOcclusion}
          updateValue={slopesParams.setEnableOcclusion}
          renderVisualization={props => <OcclusionVisualization {...props} />}
        />
        <ToggleControl
          width={buttonSize}
          height={buttonSize}
          value={slopesParams.enableLineBoost}
          updateValue={slopesParams.setEnableLineBoost}
          renderVisualization={props => <LineBoostVisualization {...props} />}
        />
      </Column>
    </InstrumentCluster>
  );
};

export default PerspectiveCluster;
