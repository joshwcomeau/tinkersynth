// @flow
import React, { useContext } from 'react';

import { UNIT } from '../../../constants';

import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';
import BezierControl from '../../BezierControl';
import SliderIconControl from '../../SliderIconControl';
import Spacer from '../../Spacer';
import PersonInflateVisualization from './PersonInflateVisualization';
import WavelengthVisualization from './WavelengthVisualization';

type Props = {
  width: number,
};

const PerspectiveCluster = ({ width }: Props) => {
  const slopesParams = useContext(SlopesContext);

  const innerWidth = width - UNIT * 2 - 2;

  const sliderWidth = 36;
  const sliderPadding = 4;

  const numOfSliders = 2;

  const bezierControlWidth = innerWidth - (sliderWidth + UNIT) * numOfSliders;
  const bezierControlHeight = bezierControlWidth;

  const sliderHeight = bezierControlHeight;

  return (
    <InstrumentCluster>
      <BezierControl
        curve={slopesParams.peaksCurve}
        updateCurve={slopesParams.setPeaksCurve}
        width={bezierControlWidth}
        height={bezierControlHeight}
      />

      <Spacer size={UNIT} />

      <SliderIconControl
        width={sliderWidth}
        height={sliderHeight}
        padding={sliderPadding}
        value={slopesParams.personInflateAmount}
        updateValue={slopesParams.setPersonInflateAmount}
        visualizationComponent={PersonInflateVisualization}
      />

      <Spacer size={UNIT} />

      <SliderIconControl
        width={sliderWidth}
        height={sliderHeight}
        padding={sliderPadding}
        value={slopesParams.wavelength}
        updateValue={slopesParams.setWavelength}
        visualizationComponent={WavelengthVisualization}
      />
    </InstrumentCluster>
  );
};

export default PerspectiveCluster;
