// @flow
import React from 'react';
import styled from 'styled-components';

import Spacer from '../Spacer';

import LoadingCase from './LoadingCase';
import LoadingSine from './LoadingSine';
import LoadingTouchSlider from './LoadingTouchSlider';
import LoadingBezier from './LoadingBezier';
import LoadingPolar from './LoadingPolar';
import LoadingSlider from './LoadingSlider';
import LoadingLilButtons from './LoadingLilButtons';
import LoadingStatus from './LoadingStatus';
import LoadingEarth from './LoadingEarth';

// TODO: Should I support a `size` prop? Is it worth it?
type Props = {};

// Our total size is 145x177, but that includes the case's 3D effect.
// The front panel of the case is 128 x 160, and this is the size I'm going
// to use. I'll let the 3D effect stuff spill out of bounds.
const PANEL_WIDTH = 128;
const PANEL_HEIGHT = 160;

const LoadingMachine = ({  }: Props) => {
  return (
    <Wrapper>
      <Background>
        <LoadingCase />
      </Background>

      <Foreground style={{ width: PANEL_WIDTH, height: PANEL_HEIGHT }}>
        <Row>
          <LoadingSine />
          <Spacer size={8} />
          <Column>
            <LoadingTouchSlider />
            <LoadingTouchSlider />
          </Column>
        </Row>

        <Spacer size={8} />

        <Row>
          <LoadingBezier />
          <Spacer size={8} />
          <LoadingPolar />
        </Row>

        <Spacer size={8} />

        <Row>
          <Sliders>
            <LoadingSlider />
            <LoadingSlider />
          </Sliders>
          <Spacer size={8} />
          <LoadingEarth />
          <Spacer size={8} />
          <Column>
            <LoadingLilButtons />
            <LoadingStatus />
          </Column>
        </Row>
      </Foreground>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const Background = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
`;

const Foreground = styled.div`
  position: relative;
  z-index: 2;
  padding: 10px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Sliders = styled.div`
  display: flex;
`;

export default LoadingMachine;
