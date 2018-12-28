// @flow
import React, { useContext } from 'react';

import { UNIT } from '../../../constants';

import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';
import TouchSliderIconControl from '../../TouchSliderIconControl';

type Props = {
  width: number,
};

const SimilarityCluster = ({ width }: Props) => {
  const slopesParams = useContext(SlopesContext);

  const OUTER_BORDER_WIDTH = 1;
  const innerWidth = width - UNIT * 2 - OUTER_BORDER_WIDTH * 2;

  return (
    <InstrumentCluster>
      <TouchSliderIconControl
        value={slopesParams.selfSimilarity}
        updateValue={slopesParams.setSelfSimilarity}
        width={innerWidth}
        height={32}
        renderVisualization={(value, size) => null}
      />
    </InstrumentCluster>
  );
};

export default SimilarityCluster;
