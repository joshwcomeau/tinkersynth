// @flow
import React, { useContext } from 'react';
import styled from 'styled-components';

import { UNIT } from '../../../constants';

import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';
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
  tweakParameter: TweakParameterAction,
  isShuffled: boolean,
};

const NoiseCluster = ({
  width,
  spikyness,
  staticAmount,
  isStaticAmountDisabled,
  tweakParameter,
  isShuffled,
}: Props) => {
  const innerWidth = width - UNIT * 2 - 2;

  const sliderHeight = 157;

  const secondarySliderWidth = 32;
  const secondarySliderPadding = 4;

  const videoSliderWidth = innerWidth - secondarySliderWidth - UNIT;

  return (
    <InstrumentCluster direction="column">
      <Row>
        <SliderVideoControl
          value={spikyness}
          updateValue={val => tweakParameter('spikyness', val)}
          width={videoSliderWidth}
          height={sliderHeight}
          spacing={0}
          visualizationComponent={NoiseVisualization}
        />

        <Spacer size={UNIT} />

        <SliderIconControl
          value={staticAmount}
          updateValue={val => tweakParameter('staticAmount', val)}
          width={secondarySliderWidth}
          height={sliderHeight}
          padding={secondarySliderPadding}
          visualizationComponent={StaticVisualization}
          numOfNotches={14}
          isDisabled={isStaticAmountDisabled}
          isAnimated={!isShuffled}
        />
      </Row>
    </InstrumentCluster>
  );
};

const OptimizedNoiseCluster = React.memo(NoiseCluster);

const NoiseContainer = ({ width }) => {
  const slopesParams = useContext(SlopesContext);

  const isStaticAmountDisabled = slopesParams.disabledParams.staticAmount;

  return (
    <OptimizedNoiseCluster
      width={width}
      spikyness={slopesParams.spikyness}
      staticAmount={slopesParams.staticAmount}
      isStaticAmountDisabled={slopesParams.disabledParams.staticAmount}
      tweakParameter={slopesParams.tweakParameter}
      isShuffled={slopesParams.isShuffled}
    />
  );
};

const Row = styled.div`
  display: flex;
`;

export default NoiseContainer;
