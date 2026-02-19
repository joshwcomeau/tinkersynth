import React from 'react';
import styled from 'styled-components';

import { COLORS, UNIT } from '../../constants';
import displayBgSrc from '../../images/display-bg.png';

import Line from './Line';

const CanvasDisplay = ({
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
        width={138}
        height={69}
        lineLength={lineLength}
        lineCurve={lineCurve}
        springConfig={{
          tension: 120,
          friction: 30,
        }}
      />
    </LineWrapper>

    <Background>
      <img src={displayBgSrc} style={{ width: 200, height: 200 }} />
    </Background>
  </Wrapper>
);

const Wrapper = styled.div`
  position: relative;
`;

const LineWrapper = styled.div`
  position: absolute;
  z-index: 2;
  top: 37px;
  left: 48px;
`;

const Background = styled.div`
  position: relative;
  z-index: 1;
`;

export default CanvasDisplay;
