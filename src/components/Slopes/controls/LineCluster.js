import React, { useContext } from 'react';
import styled from 'styled-components';

import { UNIT } from '../../../constants';
import memoWhileIgnoring from '../../../hocs/memo-while-ignoring';

import TouchSliderIconControl from '../../TouchSliderIconControl';
import Spacer from '../../Spacer';
import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';

import OcclusionVisualization from './OcclusionVisualization';
import LegoBrickVisualization from './LegoBrickVisualization';
import OctaveVisualization from './OctaveVisualization';

type Props = {
  width: number,
  dotAmount: number,
  setDotAmount: (val: number) => void,
  isRandomized: boolean,
};

const LineCluster = ({
  columnWidth,
  dotAmount,
  setDotAmount,
  isRandomized,
}) => {
  return (
    <InstrumentCluster direction="row">
      <TouchSliderIconControl
        value={dotAmount}
        updateValue={setDotAmount}
        width={columnWidth}
        height={54}
        visualizationComponent={LegoBrickVisualization}
        isAnimated={!isRandomized}
      />
      <Spacer size={UNIT} />
    </InstrumentCluster>
  );
};

const OptimizedLineCluster = memoWhileIgnoring(
  ['setDotAmount', 'isRandomized'],
  LineCluster
);

const Container = ({ columnWidth }) => {
  const slopesParams = useContext(SlopesContext);

  return (
    <OptimizedLineCluster
      columnWidth={columnWidth}
      dotAmount={slopesParams.dotAmount}
      setDotAmount={slopesParams.setDotAmount}
      isRandomized={slopesParams.isRandomized}
    />
  );
};

export default Container;
