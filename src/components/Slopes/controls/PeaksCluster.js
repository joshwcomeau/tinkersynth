// @flow
import React, { useContext } from 'react';
import styled from 'styled-components';

import { COLORS, CONTROL_RADIUS, UNIT } from '../../../constants'

import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';
import BezierControl from '../../BezierControl';
import Slider from '../../Slider';
import Spacer from '../../Spacer';
import Column from '../../Column';

const PerspectiveCluster = ({ width }) => {
  const slopesParams = useContext(SlopesContext);

  const sliderInnerWidth = 28
  const sliderPadding = 4;
  const sliderOuterWidth = sliderInnerWidth + sliderPadding * 2;

  const numOfSliders = 2;

  const bezierControlWidth = width - (sliderOuterWidth + UNIT) * numOfSliders;
  const bezierControlHeight = bezierControlWidth;


  const sliderIconSize = sliderOuterWidth;
  const sliderInnerHeight = bezierControlHeight - sliderPadding * 2 - sliderIconSize - UNIT;

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

      <Column>
        <SliderWrapper style={{ padding: sliderPadding }}>
          <Slider width={sliderInnerWidth} height={sliderInnerHeight} value={0.4} updateValue={() => {}} />
        </SliderWrapper>

        <div style={{width: sliderIconSize, height: sliderIconSize, background: 'red'}} />
      </Column>

      <Spacer size={UNIT} />

      <Column>
        <SliderWrapper style={{ padding: sliderPadding }}>
          <Slider width={sliderInnerWidth} height={sliderInnerHeight} value={0.4} updateValue={() => {}} />
        </SliderWrapper>

        <div style={{width: sliderIconSize, height: sliderIconSize, background: 'red'}} />
      </Column>
    </InstrumentCluster>
  );
};

const SliderWrapper = styled.div`
  background: ${COLORS.gray[700]};
  border-radius: ${CONTROL_RADIUS}px ${CONTROL_RADIUS}px;
`;


export default PerspectiveCluster;
