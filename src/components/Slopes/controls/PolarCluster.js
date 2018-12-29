// @flow
import React, { useContext } from 'react';

import { UNIT } from '../../../constants';

import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';
import SliderVideoControl from '../../SliderVideoControl';
import PolarAmountVisualization from './PolarAmountVisualization';

type Props = {
  width: number,
};

const PolarCluster = ({ width }: Props) => {
  const slopesParams = useContext(SlopesContext);

  const innerWidth = width - UNIT * 2 - 2;

  const videoSliderHeight = 130;
  const videoSliderWidth = innerWidth;

  return (
    <InstrumentCluster>
      <SliderVideoControl
        value={slopesParams.polarAmount}
        updateValue={slopesParams.setPolarAmount}
        min={0}
        max={100}
        width={videoSliderWidth}
        height={videoSliderHeight}
        spacing={15}
        visualizationComponent={PolarAmountVisualization}
      />
    </InstrumentCluster>
  );
};

export default PolarCluster;
