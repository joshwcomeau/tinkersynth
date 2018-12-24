// @flow
import React, { useContext } from 'react';

import { COLORS, CONTROL_RADIUS, UNIT } from '../../../constants';

import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';
import BezierControl from '../../BezierControl';
import SliderIconControl from '../../SliderIconControl';
import Spacer from '../../Spacer';
import Column from '../../Column';

const PerspectiveCluster = ({ width }) => {
  const slopesParams = useContext(SlopesContext);

  const sliderWidth = 36;
  const sliderPadding = 4;

  const numOfSliders = 2;

  const bezierControlWidth = width - (sliderWidth + UNIT) * numOfSliders;
  const bezierControlHeight = bezierControlWidth;

  const sliderHeight = bezierControlHeight;

  return (
    <InstrumentCluster>
      <BezierControl
        points={slopesParams.peaksCurve}
        updatePoint={slopesParams.updatePointInPeaksCurve}
        min={0}
        max={100}
        width={bezierControlWidth}
        height={bezierControlHeight}
      />

      <Spacer size={UNIT} />

      <SliderIconControl
        width={sliderWidth}
        height={sliderHeight}
        padding={sliderPadding}
      />

      <Spacer size={UNIT} />

      <SliderIconControl
        width={sliderWidth}
        height={sliderHeight}
        padding={sliderPadding}
      />
    </InstrumentCluster>
  );
};

export default PerspectiveCluster;
