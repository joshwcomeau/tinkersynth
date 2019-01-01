// @flow
import React, { useContext } from 'react';
import styled from 'styled-components';

import { UNIT } from '../../../constants';

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

const NoiseCluster = ({ width }: Props) => {
  const slopesParams = useContext(SlopesContext);

  const innerWidth = width - UNIT * 2 - 2;

  const sliderHeight = 164;

  const polarHoleSliderWidth = 32;
  const polarHoleSliderPadding = 4;

  const videoSliderWidth = innerWidth - polarHoleSliderWidth - UNIT;

  return (
    <InstrumentCluster direction="column">
      <Row>
        <SliderVideoControl
          value={slopesParams.spikyness}
          updateValue={slopesParams.setSpikyness}
          min={0}
          max={100}
          width={videoSliderWidth}
          height={sliderHeight}
          spacing={15}
          visualizationComponent={NoiseVisualization}
        />

        <Spacer size={UNIT} />

        <SliderIconControl
          width={polarHoleSliderWidth}
          height={sliderHeight}
          padding={polarHoleSliderPadding}
          value={slopesParams.ballSize}
          updateValue={slopesParams.setBallSize}
          visualizationComponent={BallSizeVisualization}
          numOfNotches={14}
          isDisabled={slopesParams.disabledParams.ballSize}
        />
      </Row>
    </InstrumentCluster>
  );
};

const Row = styled.div`
  display: flex;
`;

// $FlowIgnore
export default React.memo(NoiseCluster);
