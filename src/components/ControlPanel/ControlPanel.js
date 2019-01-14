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
  background: white;
`;

const MainContents = styled.div`
  margin-bottom: ${UNIT * 2}px;
`;

const Shadow = styled.div`
  position: absolute;
  z-index: 0;
  bottom: -30px;
  left: -20px;
  right: -20px;
  height: 40px;
  border-radius: 100%;
  background: black;
  filter: blur(30px);
  opacity: 0.25;
`;

export default ControlPanel;
