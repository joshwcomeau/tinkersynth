// @flow
import React, { useContext } from 'react';
import styled from 'styled-components';

import { UNIT } from '../../../constants';

import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';
import SliderVideoControl from '../../SliderVideoControl';
import TouchSliderIconControl from '../../TouchSliderIconControl';
import ControlCompartment from '../../ControlCompartment/ControlCompartment';

import PolarAmountVisualization from './PolarAmountVisualization';
import BallSizeVisualization from './BallSizeVisualization';
import OmegaVisualization from './OmegaVisualization';
import SplitUniverseVisualization from './SplitUniverseVisualization';
import SliderIconControl from '../../SliderIconControl';
import Spacer from '../../Spacer';

import type { TweakParameterAction } from '../SlopesState';

type Props = {
  width: number,
  polarAmount: number,
  ballSize: number,
  omega: number,
  splitUniverse: number,
  tweakParameter: TweakParameterAction,
  isBallSizeDisabled: boolean,
  isOmegaDisabled: boolean,
  animateTransitions: boolean,
  isPoweredOn: boolean,
};

const PolarCluster = ({
  width,
  polarAmount,
  ballSize,
  omega,
  splitUniverse,
  tweakParameter,
  isBallSizeDisabled,
  isOmegaDisabled,
  animateTransitions,
  isPoweredOn,
}: Props) => {
  const innerWidth = width - UNIT * 2 - 2;

  const sliderHeight = 164;

  const polarHoleSliderWidth = 32;
  const polarHoleSliderPadding = 4;

  const videoSliderWidth = innerWidth - polarHoleSliderWidth - UNIT;

  return (
    <InstrumentCluster direction="column">
      <Row>
        <SliderVideoControl
          canBreakOutOfRangeOnKeyboard
          value={polarAmount}
          updateValue={val => tweakParameter('polarAmount', val)}
          width={videoSliderWidth}
          height={sliderHeight}
          spacing={15}
          visualizationComponent={PolarAmountVisualization}
          isPoweredOn={isPoweredOn}
        />

        <Spacer size={UNIT} />

        <ControlCompartment
          orientation="vertical"
          numOfDoors={1}
          isDisabled={isBallSizeDisabled}
        >
          <SliderIconControl
            value={ballSize}
            updateValue={val => tweakParameter('ballSize', val)}
            width={polarHoleSliderWidth}
            height={sliderHeight}
            padding={polarHoleSliderPadding}
            visualizationComponent={BallSizeVisualization}
            numOfNotches={14}
            isAnimated={animateTransitions}
            isDisabled={isBallSizeDisabled}
            isPoweredOn={isPoweredOn}
          />
        </ControlCompartment>
      </Row>

      <Spacer size={UNIT} />

      <Row>
        <ControlCompartment
          orientation="horizontal"
          numOfDoors={2}
          isDisabled={isOmegaDisabled}
        >
          <TouchSliderIconControl
            value={omega}
            updateValue={val => tweakParameter('omega', val)}
            width={innerWidth}
            height={40}
            visualizationComponent={OmegaVisualization}
            isAnimated={animateTransitions}
            isDisabled={isOmegaDisabled}
            isPoweredOn={isPoweredOn}
          />
        </ControlCompartment>
      </Row>

      <Spacer size={UNIT} />

      <Row>
        <TouchSliderIconControl
          value={splitUniverse}
          updateValue={val => tweakParameter('splitUniverse', val)}
          width={innerWidth}
          height={40}
          visualizationComponent={SplitUniverseVisualization}
          isAnimated={animateTransitions}
          isPoweredOn={isPoweredOn}
        />
      </Row>
    </InstrumentCluster>
  );
};

const Row = styled.div`
  display: flex;
`;

const OptimizedPolarCluster = React.memo(PolarCluster);

const PolarContainer = ({ width }) => {
  const slopesParams = useContext(SlopesContext);

  return (
    <OptimizedPolarCluster
      width={width}
      polarAmount={slopesParams.polarAmount}
      ballSize={slopesParams.ballSize}
      omega={slopesParams.omega}
      splitUniverse={slopesParams.splitUniverse}
      tweakParameter={slopesParams.tweakParameter}
      isBallSizeDisabled={slopesParams.disabledParams.ballSize}
      isOmegaDisabled={slopesParams.disabledParams.omega}
      isPoweredOn={slopesParams.isPoweredOn}
      animateTransitions={slopesParams.animateTransitions}
    />
  );
};

export default PolarContainer;
