// @flow
import React, { useContext } from 'react';

import { UNIT } from '../../../constants';

import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';
import BezierControl from '../../BezierControl';
import SliderIconControl from '../../SliderIconControl';
import Spacer from '../../Spacer';

import PersonInflateVisualization from './PersonInflateVisualization';

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
        width={bezierControlWidth}
        height={bezierControlHeight}
      />

      <Spacer size={UNIT} />

      <SliderIconControl
        width={sliderWidth}
        height={sliderHeight}
        padding={sliderPadding}
        value={slopesParams.personInflateAmount}
        updateValue={value => {
          slopesParams.setPersonInflateAmount(value);
        }}
        renderIcon={({ value, size }) => (
          <PersonInflateVisualization value={value} size={size} />
        )}
      />

      <Spacer size={UNIT} />

      {/* <SliderIconControl
        width={sliderWidth}
        height={sliderHeight}
        padding={sliderPadding}
        renderIcon={({ value, size }) => (
          <PersonInflateVisualization value={value} size={size} />
        )}
      /> */}
    </InstrumentCluster>
  );
};

export default PerspectiveCluster;
