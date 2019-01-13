import React, { useContext } from 'react';

import { UNIT } from '../../../constants';
import memoWhileIgnoring from '../../../hocs/memo-while-ignoring';

import TouchSliderIconControl from '../../TouchSliderIconControl';
import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';

import WavelengthVisualization from './WavelengthVisualization';

type Props = {
  width: number,
  wavelength: number,
  amplitude: number,
  numOfOctaves: number,
  setWavelength: (val: number) => void,
  setAmplitude: (val: number) => void,
  setNumOfOctaves: (val: number) => void,
  isRandomized: boolean,
};

const AudioCluster = ({
  width,
  wavelength,
  amplitude,
  numOfOctaves,
  setWavelength,
  setAmplitude,
  setNumOfOctaves,
  isRandomized,
}) => {
  const OUTER_BORDER_WIDTH = 1;
  const innerWidth = width - UNIT * 2 - OUTER_BORDER_WIDTH * 2;

  return (
    <InstrumentCluster>
      <TouchSliderIconControl
        value={wavelength}
        updateValue={setWavelength}
        width={innerWidth}
        height={40}
        visualizationComponent={WavelengthVisualization}
        isAnimated={!isRandomized}
      />
    </InstrumentCluster>
  );
};

const OptimizedAudioCluster = memoWhileIgnoring(
  ['setWavelength', 'setAmplitude', 'setNumOfOctaves', 'isRandomized'],
  AudioCluster
);

const Container = ({ width }) => {
  const slopesParams = useContext(SlopesContext);

  return (
    <OptimizedAudioCluster
      width={width}
      wavelength={slopesParams.wavelength}
      amplitude={slopesParams.amplitude}
      numOfOctaves={slopesParams.numOfOctaves}
      setWavelength={slopesParams.setWavelength}
      setAmplitude={slopesParams.setAmplitude}
      setNumOfOctaves={slopesParams.setNumOfOctaves}
      isRandomized={slopesParams.isRandomized}
    />
  );
};

export default Container;
