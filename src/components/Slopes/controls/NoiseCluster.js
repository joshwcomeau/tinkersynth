// @flow
import React, { useContext } from 'react';
import styled from 'styled-components';

import { UNIT } from '../../../constants';
import memoWhileIgnoring from '../../../hocs/memo-while-ignoring';

import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';
import SliderVideoControl from '../../SliderVideoControl';
import NoiseVisualization from './NoiseVisualization';
import StaticVisualization from './StaticVisualization';
import SliderIconControl from '../../SliderIconControl';
import Spacer from '../../Spacer';

import type { SetNumber } from '../../../types';

type Props = {
  width: number,
  spikyness: number,
  setSpikyness: SetNumber,
  staticAmount: number,
  setStaticAmount: SetNumber,
  disabledParams: any,
  isRandomized: boolean,
};

const NoiseCluster = ({
  width,
  spikyness,
  setSpikyness,
  staticAmount,
  setStaticAmount,
  disabledParams,
  isRandomized,
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
          value={staticAmount}
          updateValue={setStaticAmount}
          visualizationComponent={StaticVisualization}
          numOfNotches={14}
          isDisabled={disabledParams.staticAmount}
          isAnimated={!isRandomized}
        />
      </Row>
    </InstrumentCluster>
  );
};

const OptimizedNoiseCluster = memoWhileIgnoring(
  ['setSpikyness', 'setStaticAmount', 'disabledParams', 'isRandomized'],
  NoiseCluster
);

const Container = ({ width }) => {
  const slopesParams = useContext(SlopesContext);

  return (
    <OptimizedNoiseCluster
      width={width}
      spikyness={slopesParams.spikyness}
      setSpikyness={slopesParams.setSpikyness}
      staticAmount={slopesParams.staticAmount}
      setStaticAmount={slopesParams.setStaticAmount}
      disabledParams={slopesParams.disabledParams}
      isRandomized={slopesParams.isRandomized}
    />
  );
};

const Row = styled.div`
  display: flex;
`;

export default Container;
