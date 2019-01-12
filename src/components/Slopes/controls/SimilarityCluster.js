// @flow
import React, { useContext } from 'react';

import { UNIT } from '../../../constants';
import memoWhileIgnoring from '../../../hocs/memo-while-ignoring';

import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';
import TouchSliderIconControl from '../../TouchSliderIconControl';

import SimilarityVisualization from './SimilarityVisualization';

type Props = {
  width: number,
  waterBoilAmount: number,
  setWaterBoilAmount: (val: number) => void,
};

const SimilarityCluster = ({
  width,
  waterBoilAmount,
  setWaterBoilAmount,
}: Props) => {
  const OUTER_BORDER_WIDTH = 1;
  const innerWidth = width - UNIT * 2 - OUTER_BORDER_WIDTH * 2;

  return (
    <InstrumentCluster>
      <TouchSliderIconControl
        value={waterBoilAmount}
        updateValue={setWaterBoilAmount}
        width={innerWidth}
        height={40}
        visualizationComponent={SimilarityVisualization}
      />
    </InstrumentCluster>
  );
};

const OptimizedSimilarityCluster = memoWhileIgnoring(
  ['setWaterBoilAmount'],
  SimilarityCluster
);

const Container = ({ width }) => {
  const slopesParams = useContext(SlopesContext);

  return (
    <OptimizedSimilarityCluster
      width={width}
      waterBoilAmount={slopesParams.waterBoilAmount}
      setWaterBoilAmount={slopesParams.setWaterBoilAmount}
    />
  );
};

export default Container;
