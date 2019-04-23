/**
 * This cluster features:
 * - Dots
 * - Line occlusion toggle
 * - Line thickness
 * - Line similarity
 * - points per line
 */
import React, { useContext } from 'react';
import styled from 'styled-components';

import { UNIT } from '../../../constants';

import TouchSliderIconControl from '../../TouchSliderIconControl';
import ControlCompartment from '../../ControlCompartment/ControlCompartment';
import ToggleControl from '../../ToggleControl';
import Spacer from '../../Spacer';
import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';

import OcclusionVisualization from './OcclusionVisualization';
import LegoBrickVisualization from './LegoBrickVisualization';
import SimilarityVisualization from './SimilarityVisualization';
import PersonInflateVisualization from './PersonInflateVisualization';

import type {
  ToggleParameterAction,
  TweakParameterAction,
} from '../SlopesState';

type Props = {
  width: number,
  dotAmount: number,
  enableOcclusion: boolean,
  waterBoilAmount: number,
  isWaterBoilAmountDisabled: boolean,
  lineThicknessAmount: number,
  isLineThicknessAmountDisabled: boolean,
  toggleParameter: ToggleParameterAction,
  tweakParameter: TweakParameterAction,
  animateTransitions: boolean,
  isPoweredOn: boolean,
};

const LineCluster = ({
  columnWidth,
  dotAmount,
  enableOcclusion,
  waterBoilAmount,
  isWaterBoilAmountDisabled,
  lineThicknessAmount,
  isLineThicknessAmountDisabled,
  toggleParameter,
  tweakParameter,
  animateTransitions,
  isPoweredOn,
}) => {
  const rowHeight = 54;

  const OUTER_BORDER_WIDTH = 1;

  const touchSliderWidth = columnWidth - UNIT * 0.5 - OUTER_BORDER_WIDTH * 2;

  const occlusionToggleSize = rowHeight;

  // Dot amount is special, since it shares its space with the occlusion toggle
  const dotAmountWidth = touchSliderWidth - UNIT - occlusionToggleSize;

  return (
    <InstrumentCluster direction="column">
      <Row>
        <Row>
          <TouchSliderIconControl
            value={dotAmount}
            updateValue={val => tweakParameter('dotAmount', val)}
            width={dotAmountWidth}
            height={rowHeight}
            visualizationComponent={LegoBrickVisualization}
            isAnimated={animateTransitions}
            isPoweredOn={isPoweredOn}
          />
          <Spacer size={UNIT} />
          <ToggleControl
            width={occlusionToggleSize}
            height={occlusionToggleSize}
            value={enableOcclusion}
            updateValue={() => toggleParameter('enableOcclusion')}
            visualizationComponent={OcclusionVisualization}
            isPoweredOn={isPoweredOn}
          />
        </Row>

        <Spacer size={UNIT + OUTER_BORDER_WIDTH * 2} />

        <ControlCompartment
          orientation="horizontal"
          isDisabled={isWaterBoilAmountDisabled}
        >
          <TouchSliderIconControl
            value={waterBoilAmount}
            updateValue={val => tweakParameter('waterBoilAmount', val)}
            width={touchSliderWidth}
            height={rowHeight}
            visualizationComponent={SimilarityVisualization}
            isAnimated={animateTransitions}
            isPoweredOn={isPoweredOn}
          />
        </ControlCompartment>
      </Row>

      <Spacer size={UNIT} />

      <Row>
        <Row>
          <ControlCompartment
            orientation="horizontal"
            isDisabled={isLineThicknessAmountDisabled}
          >
            <TouchSliderIconControl
              value={lineThicknessAmount}
              updateValue={val => tweakParameter('lineThicknessAmount', val)}
              width={touchSliderWidth}
              height={rowHeight}
              visualizationComponent={PersonInflateVisualization}
              isAnimated={animateTransitions}
              isPoweredOn={isPoweredOn}
            />
          </ControlCompartment>
        </Row>

        <Spacer size={UNIT + OUTER_BORDER_WIDTH * 2} />

        <ControlCompartment
          orientation="horizontal"
          isDisabled={isWaterBoilAmountDisabled}
        >
          <TouchSliderIconControl
            value={waterBoilAmount}
            updateValue={val => tweakParameter('waterBoilAmount', val)}
            width={touchSliderWidth}
            height={rowHeight}
            visualizationComponent={SimilarityVisualization}
            isAnimated={animateTransitions}
            isPoweredOn={isPoweredOn}
          />
        </ControlCompartment>
      </Row>
    </InstrumentCluster>
  );
};

const OptimizedLineCluster = React.memo(LineCluster);

const LineClusterContainer = ({ columnWidth }) => {
  const slopesParams = useContext(SlopesContext);

  return (
    <OptimizedLineCluster
      columnWidth={columnWidth}
      dotAmount={slopesParams.dotAmount}
      enableOcclusion={slopesParams.enableOcclusion}
      waterBoilAmount={slopesParams.waterBoilAmount}
      isWaterBoilAmountDisabled={slopesParams.disabledParams.waterBoilAmount}
      lineThicknessAmount={slopesParams.lineThicknessAmount}
      isLineThicknessAmountDisabled={slopesParams.disabledParams.lineThickness}
      toggleParameter={slopesParams.toggleParameter}
      tweakParameter={slopesParams.tweakParameter}
      isPoweredOn={slopesParams.isPoweredOn}
      animateTransitions={slopesParams.animateTransitions}
    />
  );
};

const Row = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
`;

export default LineClusterContainer;
