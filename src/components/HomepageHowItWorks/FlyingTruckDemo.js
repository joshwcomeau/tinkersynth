import React from 'react';
import styled from 'styled-components';

import { COLORS, UNIT } from '../../constants';

import Mailtruck from '../Mailtruck';
import AnimatedFire from '../AnimatedFire';

const FlyingTruckDemo = ({}) => (
  <Wrapper>
    <InnerWrapper>
      <TruckWrapper>
        <Mailtruck />
        <FireWrapper>
          <AnimatedFire />
        </FireWrapper>
      </TruckWrapper>
    </InnerWrapper>
  </Wrapper>
);

const Wrapper = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
`;

const InnerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TruckWrapper = styled.div`
  position: relative;
  transform: rotate(-30deg);
`;

const FireWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: -3px;
  transform: translateX(-130%) rotate(270deg);
  transform-origin: center center;
`;

export default FlyingTruckDemo;
