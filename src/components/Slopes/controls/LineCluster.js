import React, { useContext } from 'react';
import styled from 'styled-components';

import { UNIT } from '../../../constants';
import memoWhileIgnoring from '../../../hocs/memo-while-ignoring';

import TouchSliderIconControl from '../../TouchSliderIconControl';
import ToggleControl from '../../ToggleControl';
import Spacer from '../../Spacer';
import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';

import OcclusionVisualization from './OcclusionVisualization';
import LegoBrickVisualization from './LegoBrickVisualization';

type Props = {
  width: number,
  dotAmount: number,
  setDotAmount: (val: number) => void,
  enableOcclusion: boolean,
  toggleOcclusion: (val: boolean) => void,
  isRandomized: boolean,
};

const LineCluster = ({
  columnWidth,
  dotAmount,
  setDotAmount,
  enableOcclusion,
  toggleOcclusion,
  isRandomized,
}) => {
  const rowHeight = 54;

  const OUTER_BORDER_WIDTH = 1;
  const innerWidth = columnWidth - UNIT * 2 - OUTER_BORDER_WIDTH * 2;

  return (
    <InstrumentCluster direction="row">
      <TouchSliderIconControl
        value={dotAmount}
        updateValue={setDotAmount}
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
        updateValue={toggleOcclusion}
        visualizationComponent={OcclusionVisualization}
      />
    </InstrumentCluster>
  );
};

const OptimizedLineCluster = memoWhileIgnoring(
  ['setDotAmount', 'toggleOcclusion', 'isRandomized'],
  LineCluster
);

const LineClusterContainer = ({ columnWidth }) => {
  const slopesParams = useContext(SlopesContext);

  return (
    <OptimizedLineCluster
      columnWidth={columnWidth}
      dotAmount={slopesParams.dotAmount}
      setDotAmount={slopesParams.setDotAmount}
      enableOcclusion={slopesParams.enableOcclusion}
      toggleOcclusion={slopesParams.toggleOcclusion}
      isRandomized={slopesParams.isRandomized}
    />
  );
};

export default LineClusterContainer;
