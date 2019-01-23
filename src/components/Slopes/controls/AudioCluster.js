import React, { useContext } from 'react';
import styled from 'styled-components';

import { UNIT } from '../../../constants';

import { InstrumentCluster } from '../../ControlPanel';
import ControlCompartment from '../../ControlCompartment/ControlCompartment';
import TouchSliderIconControl from '../../TouchSliderIconControl';
import Spacer from '../../Spacer';

import { SlopesContext } from '../SlopesState';
import WavelengthVisualization from './WavelengthVisualization';
import AmplitudeVisualization from './AmplitudeVisualization';
import OctaveVisualization from './OctaveVisualization';

import type { TweakParameterAction } from '../SlopesState';

type Props = {
  width: number,
  wavelength: number,
  amplitudeAmount: number,
  octaveAmount: number,
  isWavelengthDisabled: boolean,
  isAmplitudeAmountDisabled: boolean,
  isOctaveAmountDisabled: boolean,
  tweakParameter: TweakParameterAction,
  isRandomized: boolean,
};

const AudioCluster = ({
  width,
  wavelength,
  amplitudeAmount,
  octaveAmount,
  isWavelengthDisabled,
  isAmplitudeAmountDisabled,
  isOctaveAmountDisabled,
  tweakParameter,
  isRandomized,
}) => {
  const OUTER_BORDER_WIDTH = 1;
  const innerWidth = width - UNIT * 2 - OUTER_BORDER_WIDTH * 2;

  return (
    <InstrumentCluster direction="column">
      <ControlCompartment
        orientation="horizontal"
        numOfDoors={1}
        isDisabled={isAmplitudeAmountDisabled}
      >
        <TouchSliderIconControl
          value={amplitudeAmount}
          updateValue={val => tweakParameter('amplitudeAmount', val)}
          width={innerWidth}
          height={47}
          visualizationComponent={AmplitudeVisualization}
          isAnimated={!isRandomized}
          colorway="red"
        />
      </ControlCompartment>

      <Spacer size={UNIT} />

      <ControlCompartment
        orientation="horizontal"
        numOfDoors={1}
        isDisabled={isWavelengthDisabled}
      >
        <TouchSliderIconControl
          value={wavelength}
          updateValue={val => tweakParameter('wavelength', val)}
          width={innerWidth}
          height={47}
          visualizationComponent={WavelengthVisualization}
          isAnimated={!isRandomized}
          colorway="yellow"
        />
      </ControlCompartment>

      <Spacer size={UNIT} />

      <ControlCompartment
        orientation="horizontal"
        numOfDoors={1}
        isDisabled={isOctaveAmountDisabled}
      >
        <TouchSliderIconControl
          value={octaveAmount}
          updateValue={val => tweakParameter('octaveAmount', val)}
          width={innerWidth}
          height={47}
          visualizationComponent={OctaveVisualization}
          isAnimated={!isRandomized}
          colorway="blue"
        />
      </ControlCompartment>
    </InstrumentCluster>
  );
};

const OptimizedAudioCluster = React.memo(AudioCluster);

const AudioContainer = ({ width }) => {
  const slopesParams = useContext(SlopesContext);

  return (
    <OptimizedAudioCluster
      width={width}
      wavelength={slopesParams.wavelength}
      amplitudeAmount={slopesParams.amplitudeAmount}
      octaveAmount={slopesParams.octaveAmount}
      isWavelengthDisabled={slopesParams.disabledParams.wavelength}
      isAmplitudeAmountDisabled={slopesParams.disabledParams.amplitudeAmount}
      isOctaveAmountDisabled={slopesParams.disabledParams.octaveAmount}
      tweakParameter={slopesParams.tweakParameter}
      isRandomized={slopesParams.isRandomized}
    />
  );
};

export default AudioContainer;
