// @flow
import React, { useContext } from 'react';

import { UNIT } from '../../../constants';
import memoWhileIgnoring from '../../../hocs/memo-while-ignoring';

import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';
import SliderVideoControl from '../../SliderVideoControl';
import ToggleControl from '../../ToggleControl';
import Spacer from '../../Spacer';
import Column from '../../Column';
import PerspectiveVisualization from './PerspectiveVisualization';
import OcclusionVisualization from './OcclusionVisualization';
import LineBoostVisualization from './LineBoostVisualization';

type Props = {
  width: number,
};

const PerspectiveCluster = ({
  width,
  perspective,
  enableOcclusion,
  enableLineBoost,
  setPerspective,
  setEnableOcclusion,
  setEnableLineBoost,
}: Props) => {
  const innerWidth = width - UNIT * 2 - 2;

  const videoSliderHeight = 130;

  // Our toggleControl should use up half of the available vertical space,
  // minus the UNIT of padding separating the two.
  const toggleControlSize = (videoSliderHeight - UNIT) / 2;
  const videoSliderWidth = innerWidth - toggleControlSize - UNIT;

  return (
    <InstrumentCluster>
      <SliderVideoControl
        value={perspective}
        updateValue={setPerspective}
        width={videoSliderWidth}
        height={videoSliderHeight}
        visualizationComponent={PerspectiveVisualization}
      />
      <Spacer size={UNIT} />
      <Column>
        <ToggleControl
          width={toggleControlSize}
          height={toggleControlSize}
          value={enableOcclusion}
          updateValue={setEnableOcclusion}
          visualizationComponent={OcclusionVisualization}
        />
        <ToggleControl
          width={toggleControlSize}
          height={toggleControlSize}
          value={enableLineBoost}
          updateValue={setEnableLineBoost}
          visualizationComponent={LineBoostVisualization}
        />
      </Column>
    </InstrumentCluster>
  );
};

const OptimizedPerspectiveCluster = memoWhileIgnoring(
  ['setPerspective', 'setEnableOcclusion', 'setEnableLineBoost'],
  PerspectiveCluster
);

const Container = ({ width }) => {
  const slopesParams = useContext(SlopesContext);

  return (
    <OptimizedPerspectiveCluster
      width={width}
      perspective={slopesParams.perspective}
      enableOcclusion={slopesParams.enableOcclusion}
      enableLineBoost={slopesParams.enableLineBoost}
      setPerspective={slopesParams.setPerspective}
      setEnableOcclusion={slopesParams.setEnableOcclusion}
      setEnableLineBoost={slopesParams.setEnableLineBoost}
    />
  );
};

export default Container;
