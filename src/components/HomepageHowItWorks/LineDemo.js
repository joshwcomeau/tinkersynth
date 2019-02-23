import React from 'react';
import styled from 'styled-components';
import { Spring } from 'react-spring';

import { COLORS, UNIT } from '../../constants';
import { normalize } from '../../utils';

import HomeSlider from './HomeSlider';

const getLinePath = (width, height, lineLength, lineCurve) => {
  const startX = normalize(lineLength, 0, 100, width * 0.1, width * 0.6);
  const endX = normalize(lineLength, 0, 100, width * 0.9, width * 0.4);

  const startY = normalize(lineCurve, 0, 100, height * 0.8, height * 0.2);
  const endY = normalize(lineCurve, 0, 100, height * 0.8, height * 0.2);

  const controlX = width / 2;
  const controlY = normalize(lineCurve, 0, 100, -height * 0.25, height * 1.45);

  return `
    M ${startX}, ${startY}
    Q ${controlX}, ${controlY}
      ${endX}, ${endY}
  `;
};

const LineDemo = ({
  width = 184,
  height = 92,
  lineLength,
  lineCurve,
  setLineLength,
  setLineCurve,
}) => (
  <Wrapper>
    <LineWrapper>
      <svg width={width} height={height} viewBox="0 0 184 92">
        <Spring to={{ lineLength, lineCurve }}>
          {interpolated => (
            <path
              d={getLinePath(
                width,
                height,
                interpolated.lineLength,
                interpolated.lineCurve
              )}
              fill="none"
              stroke={COLORS.white}
              strokeWidth={5}
              strokeLinecap="round"
            />
          )}
        </Spring>
      </svg>
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
