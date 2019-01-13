import React, { useContext } from 'react';
import styled from 'styled-components';

import { UNIT } from '../../../constants';
import memoWhileIgnoring from '../../../hocs/memo-while-ignoring';

import TouchSliderIconControl from '../../TouchSliderIconControl';
import Spacer from '../../Spacer';
import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';

import WavelengthVisualization from './WavelengthVisualization';

type Props = {
  width: number,
  wavelength: number,
  amplitudeAmount: number,
  numOfOctaves: number,
  setWavelength: (val: number) => void,
  setAmplitudeAmount: (val: number) => void,
  setNumOfOctaves: (val: number) => void,
  isRandomized: boolean,
};

const AudioCluster = ({
  width,
  wavelength,
  amplitudeAmount,
  numOfOctaves,
  setWavelength,
  setAmplitudeAmount,
  setNumOfOctaves,
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
          visualizationComponent={WavelengthVisualization}
          isAnimated={!isRandomized}
        />
      </Row>
      <Spacer size={UNIT} />

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
    </InstrumentCluster>
  );
};

const Row = styled.div`
  display: flex;
`;

const OptimizedAudioCluster = memoWhileIgnoring(
  ['setWavelength', 'setAmplitudeAmount', 'setNumOfOctaves', 'isRandomized'],
  AudioCluster
);

const Container = ({ width }) => {
  const slopesParams = useContext(SlopesContext);

  return (
    <OptimizedAudioCluster
      width={width}
      wavelength={slopesParams.wavelength}
      amplitudeAmount={slopesParams.amplitudeAmount}
      numOfOctaves={slopesParams.numOfOctaves}
      setWavelength={slopesParams.setWavelength}
      setAmplitudeAmount={slopesParams.setAmplitudeAmount}
      setNumOfOctaves={slopesParams.setNumOfOctaves}
      isRandomized={slopesParams.isRandomized}
    />
  );
};

export default Container;
