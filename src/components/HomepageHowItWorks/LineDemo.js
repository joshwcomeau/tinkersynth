import React from 'react';
import styled from 'styled-components';

import { COLORS, UNIT } from '../../constants';

import HomeSlider from './HomeSlider';
import Line from './Line';

const LineDemo = ({
  width,
  height,
  lineLength,
  lineCurve,
  setLineLength,
  setLineCurve,
}) => (
  <Wrapper>
    <LineWrapper>
      <Line
        width={184}
        height={92}
        lineLength={lineLength}
        lineCurve={lineCurve}
      />
    </LineWrapper>

    <ControlsWrapper>
      <HomeSlider
        value={lineLength}
        updateValue={setLineLength}
        width={150}
        height={40}
      />
      <HomeSlider
        value={lineCurve}
        updateValue={setLineCurve}
        width={150}
        height={40}
      />
    </ControlsWrapper>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  padding: 8px;
`;

const LineWrapper = styled.div`
  flex: 1;
`;

const ControlsWrapper = styled.div`
  height: 84px;
  background: rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding-top: 4px;
  padding-bottom: 4px;
`;

const HomeSliderWrapper = styled.div`
  position: relative;
  display: inline-block;
  height: 40px;
  margin: auto;
`;

export default LineDemo;
