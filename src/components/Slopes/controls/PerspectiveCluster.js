// @flow
import React, { useContext } from 'react';

import { UNIT } from '../../../constants';

import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';
import SliderVideoControl from '../../SliderVideoControl';
import SliderIconControl from '../../SliderIconControl';
import Spacer from '../../Spacer';
import Column from '../../Column';
import PerspectiveVisualization from './PerspectiveVisualization';
import OcclusionVisualization from './OcclusionVisualization';
import LineAmountVisualization from './LineAmountVisualization';

import type { TweakParameterAction } from '../SlopesState';

type Props = {
  width: number,
  perspective: number,
  lineAmount: number,
  tweakParameter: TweakParameterAction,
  isPoweredOn: boolean,
};

const PerspectiveCluster = ({
  width,
  perspective,
  lineAmount,
  tweakParameter,
  isPoweredOn,
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
        canBreakOutOfRangeOnKeyboard
        value={perspective}
        updateValue={val => tweakParameter('perspective', val)}
        width={videoSliderWidth}
        height={videoSliderHeight}
        visualizationComponent={PerspectiveVisualization}
        isPoweredOn={isPoweredOn}
      />

      <Spacer size={UNIT} />

      <Column>
        <SliderIconControl
          width={secondarySliderWidth}
          height={videoSliderHeight}
          numOfNotches={13}
          value={lineAmount}
          updateValue={val => tweakParameter('lineAmount', val)}
          visualizationComponent={LineAmountVisualization}
          isPoweredOn={isPoweredOn}
        />
      </Column>
    </InstrumentCluster>
  );
};

const OptimizedPerspectiveCluster = React.memo(PerspectiveCluster);

const PerspectiveContainer = ({ width }) => {
  const slopesParams = useContext(SlopesContext);

  return (
    <OptimizedPerspectiveCluster
      width={width}
      perspective={slopesParams.perspective}
      lineAmount={slopesParams.lineAmount}
      isPoweredOn={slopesParams.isPoweredOn}
      tweakParameter={slopesParams.tweakParameter}
    />
  );
};

export default PerspectiveContainer;
