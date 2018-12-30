// @flow
import React, { useContext } from 'react';

import { UNIT } from '../../../constants';

import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';
import SliderVideoControl from '../../SliderVideoControl';
import PolarAmountVisualization from './PolarAmountVisualization';
import PolarHoleSizeVisualization from './PolarHoleSizeVisualization';
import SliderIconControl from '../../SliderIconControl';
import Spacer from '../../Spacer';

type Props = {
  width: number,
};

const PolarCluster = ({ width }: Props) => {
  const slopesParams = useContext(SlopesContext);

  const innerWidth = width - UNIT * 2 - 2;

  const sliderHeight = 150;

  const polarHoleSliderWidth = 36;
  const polarHoleSliderPadding = 4;

  const videoSliderWidth = innerWidth - polarHoleSliderWidth - UNIT;

  return (
    <InstrumentCluster>
      <SliderVideoControl
        value={slopesParams.polarAmount}
        updateValue={slopesParams.setPolarAmount}
        min={0}
        max={100}
        width={videoSliderWidth}
        height={sliderHeight}
        spacing={15}
        visualizationComponent={PolarAmountVisualization}
      />

      <Spacer size={UNIT} />

      <SliderIconControl
        width={polarHoleSliderWidth}
        height={sliderHeight}
        padding={polarHoleSliderPadding}
        value={slopesParams.ballSize}
        updateValue={slopesParams.setBallSize}
        visualizationComponent={PolarHoleSizeVisualization}
      />
    </InstrumentCluster>
  );
};

export default PolarCluster;
