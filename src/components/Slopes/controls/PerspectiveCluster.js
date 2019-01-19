// @flow
import React, { useContext } from 'react';

import { UNIT } from '../../../constants';
import memoWhileIgnoring from '../../../hocs/memo-while-ignoring';

import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';
import SliderVideoControl from '../../SliderVideoControl';
import SliderIconControl from '../../SliderIconControl';
import Spacer from '../../Spacer';
import Column from '../../Column';
import PerspectiveVisualization from './PerspectiveVisualization';
import OcclusionVisualization from './OcclusionVisualization';
import LineAmountVisualization from './LineAmountVisualization';

type Props = {
  width: number,
  perspective: number,
  lineAmount: number,
  setPerspective: (val: number) => void,
  setLineAmount: (val: number) => void,
};

const PerspectiveCluster = ({
  width,
  perspective,
  lineAmount,
  setPerspective,
  setLineAmount,
}: Props) => {
  const innerWidth = width - UNIT * 2 - 2;

  const videoSliderHeight = 130;

  // Our toggleControl should use up half of the available vertical space,
  // minus the UNIT of padding separating the two.
  const secondarySliderWidth = 36;
  const videoSliderWidth = innerWidth - secondarySliderWidth - UNIT;

  return (
    <InstrumentCluster>
      <SliderVideoControl
        value={perspective}
        updateValue={setPerspective}
        width={videoSliderWidth}
        height={videoSliderHeight}
        visualizationComponent={PerspectiveVisualization}
      />
      <Spacer size={UNIT} />
      <Column>
        <SliderIconControl
          width={secondarySliderWidth}
          height={videoSliderHeight}
          value={lineAmount}
          updateValue={setLineAmount}
          visualizationComponent={LineAmountVisualization}
        />
      </Column>
    </InstrumentCluster>
  );
};

const OptimizedPerspectiveCluster = memoWhileIgnoring(
  ['setPerspective', 'setLineAmount'],
  PerspectiveCluster
);

const Container = ({ width }) => {
  const slopesParams = useContext(SlopesContext);

  return (
    <OptimizedPerspectiveCluster
      width={width}
      perspective={slopesParams.perspective}
      lineAmount={slopesParams.lineAmount}
      setPerspective={slopesParams.setPerspective}
      setLineAmount={slopesParams.setLineAmount}
    />
  );
};

export default Container;
