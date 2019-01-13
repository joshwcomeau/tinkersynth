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

import type { Curve, SetNumber } from '../../../types';

type Props = {
  width: number,
  peaksCurve: Curve,
  personInflateAmount: number,
  wavelength: number,
  setPeaksCurve: SetNumber,
  setPersonInflateAmount: SetNumber,
  setWavelength: SetNumber,
  isRandomized: boolean,
};

const PeaksCluster = ({
  width,
  peaksCurve,
  personInflateAmount,
  wavelength,
  setPeaksCurve,
  setPersonInflateAmount,
  setWavelength,
  isRandomized,
}: Props) => {
  const innerWidth = width - UNIT * 2 - 2;

  const sliderWidth = 36;
  const sliderPadding = 4;

  const numOfSliders = 1;

  const bezierControlWidth = innerWidth - (sliderWidth + UNIT) * numOfSliders;
  const bezierControlHeight = 170;

  const sliderHeight = bezierControlHeight;

  return (
    <InstrumentCluster>
      <BezierControl
        curve={peaksCurve}
        updateCurve={setPeaksCurve}
        width={bezierControlWidth}
        height={bezierControlHeight}
        isAnimated={isRandomized}
      />

      <Spacer size={UNIT} />

      <SliderIconControl
        width={sliderWidth}
        height={sliderHeight}
        padding={sliderPadding}
        value={personInflateAmount}
        updateValue={setPersonInflateAmount}
        visualizationComponent={PersonInflateVisualization}
        isAnimated={!isRandomized}
      />
    </InstrumentCluster>
  );
};

const OptimizedPeaksCluster = memoWhileIgnoring(
  ['setPeaksCurve', 'setPersonInflateAmount', 'isRandomized'],
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
      isRandomized={slopesParams.isRandomized}
    />
  );
};

export default Container;
