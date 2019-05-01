// @flow
import React, { useContext } from 'react';
import styled from 'styled-components';

import { UNIT } from '../../../constants';

import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';
import ControlCompartment from '../../ControlCompartment/ControlCompartment';

import SliderVideoControl from '../../SliderVideoControl';
import NoiseVisualization from './NoiseVisualization';
import StaticVisualization from './StaticVisualization';
import SliderIconControl from '../../SliderIconControl';
import Spacer from '../../Spacer';

import type { SetNumber } from '../../../types';
import type { TweakParameterAction } from '../SlopesState';

type Props = {
  width: number,
  spikyness: number,
  staticAmount: number,
  isStaticAmountDisabled: boolean,
  animateTransitions: boolean,
  isPoweredOn: boolean,
  tweakParameter: TweakParameterAction,
};

const NoiseCluster = ({
  width,
  spikyness,
  staticAmount,
  isStaticAmountDisabled,
  animateTransitions,
  isPoweredOn,
  tweakParameter,
}: Props) => {
  const innerWidth = width - UNIT * 2 - 2;

  const sliderHeight = 182;

  const secondarySliderWidth = 32;
  const secondarySliderPadding = 4;

  const videoSliderWidth = innerWidth - secondarySliderWidth - UNIT;

  return (
    <InstrumentCluster direction="column">
      <Row>
        <SliderVideoControl
          canBreakOutOfRangeOnKeyboard
          value={spikyness}
          updateValue={val => tweakParameter('spikyness', val)}
          width={videoSliderWidth}
          height={sliderHeight}
          spacing={0}
          isPoweredOn={isPoweredOn}
          visualizationComponent={NoiseVisualization}
        />

        <Spacer size={UNIT} />

        <ControlCompartment
          orientation="vertical"
          numOfDoors={1}
          isDisabled={isStaticAmountDisabled}
        >
          <SliderIconControl
            value={staticAmount}
            updateValue={val => tweakParameter('staticAmount', val)}
            width={secondarySliderWidth}
            height={sliderHeight}
            padding={secondarySliderPadding}
            visualizationComponent={StaticVisualization}
            numOfNotches={14}
            isDisabled={isStaticAmountDisabled}
            isAnimated={animateTransitions}
            isPoweredOn={isPoweredOn}
          />
        </ControlCompartment>
      </Row>
    </InstrumentCluster>
  );
};

// $FlowIgnore
const OptimizedNoiseCluster = React.memo(NoiseCluster);

const NoiseContainer = ({ width }: { width: number }) => {
  const slopesParams = useContext(SlopesContext);

  const isStaticAmountDisabled = slopesParams.disabledParams.staticAmount;

  return (
    <OptimizedNoiseCluster
      width={width}
      spikyness={slopesParams.spikyness}
      staticAmount={slopesParams.staticAmount}
      isStaticAmountDisabled={slopesParams.disabledParams.staticAmount}
      animateTransitions={slopesParams.animateTransitions}
      isPoweredOn={slopesParams.isPoweredOn}
      tweakParameter={slopesParams.tweakParameter}
    />
  );
};

const Row = styled.div`
  display: flex;
`;

export default NoiseContainer;
