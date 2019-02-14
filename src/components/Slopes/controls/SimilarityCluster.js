// @flow
import React, { useContext } from 'react';

import { UNIT } from '../../../constants';

import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';
import TouchSliderIconControl from '../../TouchSliderIconControl';
import ControlCompartment from '../../ControlCompartment/ControlCompartment';

import SimilarityVisualization from './SimilarityVisualization';

import type { TweakParameterAction } from '../SlopesState';

type Props = {
  width: number,
  waterBoilAmount: number,
  isWaterBoilAmountDisabled: boolean,
  animateTransitions: boolean,
  isPoweredOn: boolean,
  tweakParameter: TweakParameterAction,
};

const SimilarityCluster = ({
  width,
  waterBoilAmount,
  isWaterBoilAmountDisabled,
  animateTransitions,
  isPoweredOn,
  tweakParameter,
}: Props) => {
  const OUTER_BORDER_WIDTH = 1;
  const innerWidth = width - UNIT * 2 - OUTER_BORDER_WIDTH * 2;

  return (
    <InstrumentCluster>
      <ControlCompartment
        orientation="horizontal"
        isDisabled={isWaterBoilAmountDisabled}
      >
        <TouchSliderIconControl
          value={waterBoilAmount}
          updateValue={val => tweakParameter('waterBoilAmount', val)}
          width={innerWidth}
          height={40}
          visualizationComponent={SimilarityVisualization}
          isAnimated={animateTransitions}
          isPoweredOn={isPoweredOn}
        />
      </ControlCompartment>
    </InstrumentCluster>
  );
};

const OptimizedSimilarityCluster = React.memo(SimilarityCluster);

const SimilarityContainer = ({ width }) => {
  const slopesParams = useContext(SlopesContext);

  return (
    <OptimizedSimilarityCluster
      width={width}
      waterBoilAmount={slopesParams.waterBoilAmount}
      isWaterBoilAmountDisabled={slopesParams.disabledParams.waterBoilAmount}
      animateTransitions={slopesParams.animateTransitions}
      isPoweredOn={slopesParams.isPoweredOn}
      tweakParameter={slopesParams.tweakParameter}
    />
  );
};

export default SimilarityContainer;
