import React, { useContext } from 'react';
import styled from 'styled-components';

import { UNIT } from '../../../constants';
import memoWhileIgnoring from '../../../hocs/memo-while-ignoring';

import TouchSliderIconControl from '../../TouchSliderIconControl';
import Spacer from '../../Spacer';
import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';

import OcclusionVisualization from './OcclusionVisualization';
import AmplitudeVisualization from './AmplitudeVisualization';
import OctaveVisualization from './OctaveVisualization';

type Props = {
  width: number,
  wavelength: number,
  amplitudeAmount: number,
  octaveAmount: number,
  setWavelength: (val: number) => void,
  setAmplitudeAmount: (val: number) => void,
  setOctaveAmount: (val: number) => void,
  isRandomized: boolean,
};

const LineCluster = ({
  width,
  wavelength,
  amplitudeAmount,
  octaveAmount,
  setWavelength,
  setAmplitudeAmount,
  setOctaveAmount,
  isRandomized,
}) => {
  const OUTER_BORDER_WIDTH = 1;
  const innerWidth = width - UNIT * 2 - OUTER_BORDER_WIDTH * 2;

  return (
    <InstrumentCluster direction="row">
      <TouchSliderIconControl
        value={amplitudeAmount}
        updateValue={setAmplitudeAmount}
        width={innerWidth}
        height={47}
        visualizationComponent={AmplitudeVisualization}
        isAnimated={!isRandomized}
      />
      <Spacer size={UNIT} />

      <ToggleControl
        width={toggleControlSize}
        height={toggleControlSize}
        value={enableOcclusion}
        updateValue={setEnableOcclusion}
        visualizationComponent={OcclusionVisualization}
      />
    </InstrumentCluster>
  );
};

const OptimizedLineCluster = memoWhileIgnoring(
  ['setWavelength', 'setAmplitudeAmount', 'setOctaveAmount', 'isRandomized'],
  LineCluster
);

const Container = ({ width }) => {
  const slopesParams = useContext(SlopesContext);

  return (
    <OptimizedLineCluster
      width={width}
      wavelength={slopesParams.wavelength}
      amplitudeAmount={slopesParams.amplitudeAmount}
      octaveAmount={slopesParams.octaveAmount}
      setWavelength={slopesParams.setWavelength}
      setAmplitudeAmount={slopesParams.setAmplitudeAmount}
      setOctaveAmount={slopesParams.setOctaveAmount}
      isRandomized={slopesParams.isRandomized}
    />
  );
};

export default Container;
