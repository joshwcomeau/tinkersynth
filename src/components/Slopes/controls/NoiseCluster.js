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

import type { SetNumber } from '../../../types';

type Props = {
  width: number,
  spikyness: number,
  setSpikyness: SetNumber,
  explosionAmount: number,
  setExplosionAmount: SetNumber,
  disabledParams: any,
};

const NoiseCluster = ({
  width,
  spikyness,
  setSpikyness,
  explosionAmount,
  setExplosionAmount,
  disabledParams,
}: Props) => {
  const innerWidth = width - UNIT * 2 - 2;

  const sliderHeight = 157;

  const secondarySliderWidth = 32;
  const secondarySliderPadding = 4;

  const videoSliderWidth = innerWidth - secondarySliderWidth - UNIT;

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
          width={secondarySliderWidth}
          height={sliderHeight}
          padding={secondarySliderPadding}
          value={explosionAmount}
          updateValue={setExplosionAmount}
          visualizationComponent={BallSizeVisualization}
          numOfNotches={14}
          isDisabled={disabledParams.explosionAmount}
        />
      </Row>
    </InstrumentCluster>
  );
};

const OptimizedNoiseCluster = memoWhileIgnoring(
  ['setSpikyness', 'setExplosionAmount', 'disabledParams'],
  NoiseCluster
);

const Container = ({ width }) => {
  const slopesParams = useContext(SlopesContext);

  return (
    <OptimizedNoiseCluster
      width={width}
      spikyness={slopesParams.spikyness}
      setSpikyness={slopesParams.setSpikyness}
      explosionAmount={slopesParams.explosionAmount}
      setExplosionAmount={slopesParams.setExplosionAmount}
      disabledParams={slopesParams.disabledParams}
    />
  );
};

const Row = styled.div`
  display: flex;
`;

export default Container;
