import React, { useContext } from 'react';
import styled from 'styled-components';

import { UNIT } from '../../../constants';
import memoWhileIgnoring from '../../../hocs/memo-while-ignoring';

import TouchSliderIconControl from '../../TouchSliderIconControl';
import Spacer from '../../Spacer';
import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';

import WavelengthVisualization from './WavelengthVisualization';
import AmplitudeVisualization from './AmplitudeVisualization';

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

const AudioCluster = ({
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
    <InstrumentCluster direction="column">
      <Row>
        <TouchSliderIconControl
          value={wavelength}
          updateValue={setWavelength}
          width={innerWidth}
          height={47}
          visualizationComponent={WavelengthVisualization}
          isAnimated={!isRandomized}
        />
      </Row>
      <Spacer size={UNIT} />

      <Row>
        <TouchSliderIconControl
          value={amplitudeAmount}
          updateValue={setAmplitudeAmount}
          width={innerWidth}
          height={47}
          visualizationComponent={AmplitudeVisualization}
          isAnimated={!isRandomized}
        />
      </Row>
      <Spacer size={UNIT} />

      <Row>
        <TouchSliderIconControl
          value={octaveAmount}
          updateValue={setOctaveAmount}
          width={innerWidth}
          height={47}
          visualizationComponent={WavelengthVisualization}
          isAnimated={!isRandomized}
        />
      </Row>
    </InstrumentCluster>
  );
};

const Row = styled.div`
  display: flex;
`;

const OptimizedAudioCluster = memoWhileIgnoring(
  ['setWavelength', 'setAmplitudeAmount', 'setOctaveAmount', 'isRandomized'],
  AudioCluster
);

const Container = ({ width }) => {
  const slopesParams = useContext(SlopesContext);

  return (
    <OptimizedAudioCluster
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
