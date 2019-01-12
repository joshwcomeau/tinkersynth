// @flow
import React, { useContext } from 'react';
import styled from 'styled-components';

import { UNIT } from '../../../constants';
import memoWhileIgnoring from '../../../hocs/memo-while-ignoring';

import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';
import SliderVideoControl from '../../SliderVideoControl';
import NoiseVisualization from './NoiseVisualization';
import BallSizeVisualization from './BallSizeVisualization';
import SliderIconControl from '../../SliderIconControl';
import Spacer from '../../Spacer';

type Props = {
  width: number,
};

const NoiseCluster = ({
  width,
  spikyness,
  setSpikyness,
  ballSize,
  setBallSize,
  disabledParams,
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
          value={spikyness}
          updateValue={setSpikyness}
          width={videoSliderWidth}
          height={sliderHeight}
          spacing={0}
          visualizationComponent={NoiseVisualization}
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
    </InstrumentCluster>
  );
};

const OptimizedNoiseCluster = memoWhileIgnoring(
  ['setSpikyness', 'setBallSize', 'disabledParams'],
  NoiseCluster
);

const Container = ({ width }) => {
  const slopesParams = useContext(SlopesContext);

  return (
    <OptimizedNoiseCluster
      width={width}
      spikyness={slopesParams.spikyness}
      setSpikyness={slopesParams.setSpikyness}
      ballSize={slopesParams.ballSize}
      setBallSize={slopesParams.setBallSize}
      disabledParams={slopesParams.disabledParams}
    />
  );
};

const Row = styled.div`
  display: flex;
`;

export default Container;
