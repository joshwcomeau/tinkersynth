// @flow
import React, { useContext } from 'react';
import styled from 'styled-components';

import { UNIT } from '../../../constants';
import memoWhileIgnoring from '../../../hocs/memo-while-ignoring';

import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';
import SliderVideoControl from '../../SliderVideoControl';
import TouchSliderIconControl from '../../TouchSliderIconControl';
import PolarAmountVisualization from './PolarAmountVisualization';
import BallSizeVisualization from './BallSizeVisualization';
import OmegaVisualization from './OmegaVisualization';
import SplitUniverseVisualization from './SplitUniverseVisualization';
import SliderIconControl from '../../SliderIconControl';
import Spacer from '../../Spacer';

type Props = {
  width: number,
};

const PolarCluster = ({
  width,
  polarAmount,
  setPolarAmount,
  ballSize,
  setBallSize,
  disabledParams,
  omega,
  setOmega,
  splitUniverse,
  setSplitUniverse,
}: Props) => {
  const innerWidth = width - UNIT * 2 - 2;

  const sliderHeight = 164;

  const polarHoleSliderWidth = 32;
  const polarHoleSliderPadding = 4;

  const videoSliderWidth = innerWidth - polarHoleSliderWidth - UNIT;

  return (
    <InstrumentCluster direction="column">
      <Row>
        <SliderVideoControl
          value={polarAmount}
          updateValue={setPolarAmount}
          width={videoSliderWidth}
          height={sliderHeight}
          spacing={15}
          visualizationComponent={PolarAmountVisualization}
        />

        <Spacer size={UNIT} />

        <SliderIconControl
          width={polarHoleSliderWidth}
          height={sliderHeight}
          padding={polarHoleSliderPadding}
          value={ballSize}
          updateValue={setBallSize}
          visualizationComponent={BallSizeVisualization}
          numOfNotches={14}
          isDisabled={disabledParams.ballSize}
        />
      </Row>

      <Spacer size={UNIT} />

      <Row>
        <TouchSliderIconControl
          value={omega}
          updateValue={setOmega}
          width={innerWidth}
          height={40}
          visualizationComponent={OmegaVisualization}
        />
      </Row>

      <Spacer size={UNIT} />

      <Row>
        <TouchSliderIconControl
          value={splitUniverse}
          updateValue={setSplitUniverse}
          width={innerWidth}
          height={40}
          visualizationComponent={SplitUniverseVisualization}
        />
      </Row>
    </InstrumentCluster>
  );
};

const Row = styled.div`
  display: flex;
`;

const OptimizedPolarCluster = memoWhileIgnoring(
  [
    'setPolarAmount',
    'setBallSize',
    'setOmega',
    'setSplitUniverse',
    'disabledParams',
  ],
  PolarCluster
);

const Container = ({ width }) => {
  const slopesParams = useContext(SlopesContext);

  return (
    <OptimizedPolarCluster
      width={width}
      polarAmount={slopesParams.polarAmount}
      setPolarAmount={slopesParams.setPolarAmount}
      ballSize={slopesParams.ballSize}
      setBallSize={slopesParams.setBallSize}
      disabledParams={slopesParams.disabledParams}
      omega={slopesParams.omega}
      setOmega={slopesParams.setOmega}
      splitUniverse={slopesParams.splitUniverse}
      setSplitUniverse={slopesParams.setSplitUniverse}
    />
  );
};

export default Container;
