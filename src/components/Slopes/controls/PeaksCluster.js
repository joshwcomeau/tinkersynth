// @flow
import React, { useContext } from 'react';

import { UNIT } from '../../../constants';

import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';
import ControlCompartment from '../../ControlCompartment/ControlCompartment';

import BezierControl from '../../BezierControl';
import SliderIconControl from '../../SliderIconControl';
import Spacer from '../../Spacer';

import PersonInflateVisualization from './PersonInflateVisualization';
import WavelengthVisualization from './WavelengthVisualization';

import type { Curve } from '../../../types';
import type { TweakParameterAction } from '../SlopesState';

type Props = {
  width: number,
  peaksCurve: Curve,
  personInflateAmount: number,
  isPersonInflateAmountDisabled: boolean,
  tweakParameter: TweakParameterAction,
  animateTransitions: boolean,
};

const PeaksCluster = ({
  width,
  peaksCurve,
  personInflateAmount,
  isPersonInflateAmountDisabled,
  tweakParameter,
  animateTransitions,
}: Props) => {
  const innerWidth = width - UNIT * 2 - 2;

  const sliderWidth = 36;
  const sliderPadding = 4;

  const bezierControlWidth = innerWidth - sliderWidth - UNIT;
  const bezierControlHeight = 170;

  const sliderHeight = bezierControlHeight;

  return (
    <InstrumentCluster>
      <BezierControl
        curve={peaksCurve}
        updateCurve={curve => tweakParameter('peaksCurve', curve)}
        width={bezierControlWidth}
        height={bezierControlHeight}
        isAnimated={animateTransitions}
      />

      <Spacer size={UNIT} />

      <ControlCompartment
        orientation="vertical"
        numOfDoors={1}
        isDisabled={isPersonInflateAmountDisabled}
      >
        <SliderIconControl
          width={sliderWidth}
          height={sliderHeight}
          padding={sliderPadding}
          value={personInflateAmount}
          updateValue={val => tweakParameter('personInflateAmount', val)}
          visualizationComponent={PersonInflateVisualization}
          disabled={isPersonInflateAmountDisabled}
          isAnimated={!animateTransitions}
        />
      </ControlCompartment>
    </InstrumentCluster>
  );
};

const OptimizedPeaksCluster = React.memo(PeaksCluster);

const PeaksContainer = ({ width }) => {
  const slopesParams = useContext(SlopesContext);

  return (
    <OptimizedPeaksCluster
      width={width}
      peaksCurve={slopesParams.peaksCurve}
      personInflateAmount={slopesParams.personInflateAmount}
      isPersonInflateAmountDisabled={
        slopesParams.disabledParams.personInflateAmount
      }
      tweakParameter={slopesParams.tweakParameter}
      animateTransitions={slopesParams.animateTransitions}
    />
  );
};

export default PeaksContainer;
