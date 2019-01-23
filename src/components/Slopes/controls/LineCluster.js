import React, { useContext } from 'react';
import styled from 'styled-components';

import { UNIT } from '../../../constants';

import TouchSliderIconControl from '../../TouchSliderIconControl';
import ToggleControl from '../../ToggleControl';
import Spacer from '../../Spacer';
import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';

import OcclusionVisualization from './OcclusionVisualization';
import LegoBrickVisualization from './LegoBrickVisualization';

import type {
  ToggleParameterAction,
  TweakParameterAction,
} from '../SlopesState';

type Props = {
  width: number,
  dotAmount: number,
  enableOcclusion: boolean,
  toggleParameter: ToggleParameterAction,
  tweakParameter: TweakParameterAction,
  isRandomized: boolean,
};

const LineCluster = ({
  columnWidth,
  dotAmount,
  enableOcclusion,
  toggleParameter,
  tweakParameter,
  isRandomized,
}) => {
  const rowHeight = 54;

  const OUTER_BORDER_WIDTH = 1;
  const innerWidth = columnWidth - UNIT * 2 - OUTER_BORDER_WIDTH * 2;

  return (
    <InstrumentCluster direction="row">
      <TouchSliderIconControl
        value={dotAmount}
        updateValue={val => tweakParameter('dotAmount', val)}
        width={innerWidth}
        height={54}
        visualizationComponent={LegoBrickVisualization}
        isAnimated={!isRandomized}
      />
      <Spacer size={UNIT} />
      <ToggleControl
        width={rowHeight}
        height={rowHeight}
        value={enableOcclusion}
        updateValue={() => toggleParameter('enableOcclusion')}
        visualizationComponent={OcclusionVisualization}
      />
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
      toggleParameter={slopesParams.toggleParameter}
      tweakParameter={slopesParams.tweakParameter}
      isRandomized={slopesParams.isRandomized}
    />
  );
};

export default LineClusterContainer;
