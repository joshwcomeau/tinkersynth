import React, { useContext } from 'react';
import styled from 'styled-components';

import { UNIT } from '../../../constants';
import memoWhileIgnoring from '../../../hocs/memo-while-ignoring';

import TouchSliderIconControl from '../../TouchSliderIconControl';
import Spacer from '../../Spacer';
import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';

import OcclusionVisualization from './OcclusionVisualization';
import SegmentWidthVisualization from './SegmentWidthVisualization';
import OctaveVisualization from './OctaveVisualization';

type Props = {
  width: number,
  segmentWidth: number,
  setSegmentWidth: (val: number) => void,
  isRandomized: boolean,
};

const LineCluster = ({
  columnWidth,
  segmentWidth,
  setSegmentWidth,
  isRandomized,
}) => {
  // TODO: change segmentWidth to a word that doesn't end in `width`

  return (
    <InstrumentCluster direction="row">
      <TouchSliderIconControl
        value={segmentWidth}
        updateValue={setSegmentWidth}
        width={columnWidth}
        height={48}
        visualizationComponent={SegmentWidthVisualization}
        isAnimated={!isRandomized}
      />
      <Spacer size={UNIT} />
    </InstrumentCluster>
  );
};

const OptimizedLineCluster = memoWhileIgnoring(
  ['setSegmentWidth', 'isRandomized'],
  LineCluster
);

const Container = ({ columnWidth }) => {
  const slopesParams = useContext(SlopesContext);

  return (
    <OptimizedLineCluster
      columnWidth={columnWidth}
      segmentWidth={slopesParams.segmentWidth}
      setSegmentWidth={slopesParams.setSegmentWidth}
      isRandomized={slopesParams.isRandomized}
    />
  );
};

export default Container;
