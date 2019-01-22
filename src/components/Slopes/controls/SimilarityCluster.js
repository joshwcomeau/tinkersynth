// @flow
import React, { useContext } from 'react';

import { UNIT } from '../../../constants';
import memoWhileIgnoring from '../../../hocs/memo-while-ignoring';

import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';
import TouchSliderIconControl from '../../TouchSliderIconControl';
import ControlCompartment from '../../ControlCompartment/ControlCompartment';

import SimilarityVisualization from './SimilarityVisualization';

type Props = {
  width: number,
  waterBoilAmount: number,
  setWaterBoilAmount: (val: number) => void,
  isWaterBoilAmountDisabled: boolean,
  isRandomized: boolean,
};

const SimilarityCluster = ({
  width,
  waterBoilAmount,
  setWaterBoilAmount,
  isWaterBoilAmountDisabled,
  isRandomized,
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
          updateValue={setWaterBoilAmount}
          width={innerWidth}
          height={40}
          visualizationComponent={SimilarityVisualization}
          isAnimated={!isRandomized}
        />
      </ControlCompartment>
    </InstrumentCluster>
  );
};

const OptimizedSimilarityCluster = memoWhileIgnoring(
  ['setWaterBoilAmount', 'disabledParams', 'isRandomized'],
  SimilarityCluster
);

const Container = ({ width }) => {
  const slopesParams = useContext(SlopesContext);

  return (
    <OptimizedSimilarityCluster
      width={width}
      waterBoilAmount={slopesParams.waterBoilAmount}
      setWaterBoilAmount={slopesParams.setWaterBoilAmount}
      isWaterBoilAmountDisabled={slopesParams.disabledParams.waterBoilAmount}
      isRandomized={slopesParams.isRandomized}
    />
  );
};

export default Container;
