// @flow
import React, { useContext } from 'react';

import { UNIT } from '../../../constants';
import memoWhileIgnoring from '../../../hocs/memo-while-ignoring';

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

const PeaksCluster = ({
  width,
  peaksCurve,
  setPeaksCurve,
  personInflateAmount,
  setPersonInflateAmount,
  wavelength,
  setWavelength,
}: Props) => {
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
        curve={peaksCurve}
        updateCurve={setPeaksCurve}
        width={bezierControlWidth}
        height={bezierControlHeight}
      />

      <Spacer size={UNIT} />

      <SliderIconControl
        width={sliderWidth}
        height={sliderHeight}
        padding={sliderPadding}
        value={personInflateAmount}
        updateValue={setPersonInflateAmount}
        visualizationComponent={PersonInflateVisualization}
      />

      <Spacer size={UNIT} />

      <SliderIconControl
        width={sliderWidth}
        height={sliderHeight}
        padding={sliderPadding}
        value={wavelength}
        updateValue={setWavelength}
        visualizationComponent={WavelengthVisualization}
      />
    </InstrumentCluster>
  );
};

const OptimizedPeaksCluster = memoWhileIgnoring(
  ['setPeaksCurve', 'setPersonInflateAmount', 'setWavelength'],
  PeaksCluster
);

const Container = ({ width }) => {
  const slopesParams = useContext(SlopesContext);

  return (
    <OptimizedPeaksCluster
      width={width}
      peaksCurve={slopesParams.peaksCurve}
      setPeaksCurve={slopesParams.setPeaksCurve}
      personInflateAmount={slopesParams.personInflateAmount}
      setPersonInflateAmount={slopesParams.setPersonInflateAmount}
      wavelength={slopesParams.wavelength}
      setWavelength={slopesParams.setWavelength}
    />
  );
};

export default Container;
