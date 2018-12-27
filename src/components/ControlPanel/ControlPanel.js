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
      <TopPanel>
        <ScrewRow />
      </TopPanel>

      <ScrewRow />

      <MainPanel style={{ padding }}>
        <ChildrenWrapper>{children}</ChildrenWrapper>
      </MainPanel>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: ${COLORS.gray[100]};
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.25);
`;

const TopPanel = styled.div`
  height: 22px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-bottom: 1px solid rgba(0, 0, 0, 0.075);
`;

const MainPanel = styled.div``;

const ChildrenWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default ControlPanel;
