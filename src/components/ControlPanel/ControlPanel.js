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
      <Panel>
        <TopPanel />

        <FrontPanel>
          <DecorativeHeader>
            <ScrewRow />
          </DecorativeHeader>

          <MainContents style={{ padding }}>{children}</MainContents>
        </FrontPanel>
      </Panel>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  perspective: 200px;
`;

const Panel = styled.div`
  position: relative;
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

const MainContents = styled.div``;

export default ControlPanel;
