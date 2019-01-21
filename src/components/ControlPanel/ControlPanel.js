// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS, UNIT } from '../../constants';

import ScrewRow from './ScrewRow';

type Props = {
  width: number,
  padding: number,
  children: React$Node,
};

const ControlPanel = ({ width, padding, children }: Props) => {
  return (
    <Wrapper style={{ width }}>
      <InnerWrapper>
        <TopPanel />

        <FrontPanel>
          <DecorativeHeader>
            <ScrewRow />
          </DecorativeHeader>

          <MainContents style={{ padding }}>{children}</MainContents>

          <DecorativeFooter>
            <ScrewRow />
          </DecorativeFooter>
        </FrontPanel>
      </InnerWrapper>

      <Shadow />

      <Feet>
        <Foot />
        <Foot />
      </Feet>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  perspective: 200px;
  user-select: none;
`;

const InnerWrapper = styled.div`
  position: relative;
  z-index: 2;
  margin-top: 50px;
`;

const TopPanel = styled.div`
  position: absolute;
  width: 100%;
  height: 200px;
  top: -200px;
  left: 0;
  right: 0;
  background: linear-gradient(to top, ${COLORS.gray[300]}, ${COLORS.gray[400]});
  transform: rotateX(25deg);
  transform-origin: bottom center;
`;

const FrontPanel = styled.div`
  background: ${COLORS.gray[100]};
  border-radius: 0 0 2px 4px;
`;

const DecorativeHeader = styled.div`
  height: 22px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.075);
`;

const DecorativeFooter = styled.div`
  height: 22px;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 0 0 2px 2px;
`;

const MainContents = styled.div`
  margin-bottom: ${UNIT * 2}px;
`;

const Shadow = styled.div`
  position: absolute;
  z-index: 0;
  bottom: -10px;
  left: 0;
  right: 0;
  height: 20px;
  border-radius: 50%;
  background: black;
  filter: blur(10px);
  opacity: 0.75;
`;

const FOOT_HEIGHT = 14;
const FOOT_WIDTH = 30;

const Feet = styled.div`
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  bottom: -${FOOT_HEIGHT}px;
  height: ${FOOT_HEIGHT}px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
`;

const Foot = styled.div`
  height: ${FOOT_HEIGHT}px;
  width: ${FOOT_WIDTH}px;
  background: linear-gradient(0deg, #333, #333);
  border-radius: 0 0 7px 7px;
`;

export default ControlPanel;
