// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

import ScrewRow from './ScrewRow';

type Props = {
  children: React$Node,
};

const ControlPanel = ({ children }: Props) => {
  return (
    <Wrapper>
      <TopPanel>
        <ScrewRow />
      </TopPanel>
      <MainPanel>
        <ScrewRow />
        {children}
      </MainPanel>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 600px;
  background: ${COLORS.gray[100]};
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.25);
`;

const TopPanel = styled.div`
  height: 22px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const MainPanel = styled.div``;

export default ControlPanel;
