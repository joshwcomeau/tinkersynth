// @flow
import React from 'react';
import styled from 'styled-components';

import { UNIT, COLORS } from '../../constants';

import Spacer from '../Spacer';

type Props = {
  children: React$Node,
};

const SlopesCanvasWrapper = ({ children }: Props) => {
  return (
    <Wrapper>
      <Machine>
        <TopPanel />
        <InnerWrapper>
          <ChildWrapper>{children}</ChildWrapper>
        </InnerWrapper>

        <Spacer size={UNIT} />

        <Actions>
          <div style={{ width: 40, height: 40, background: 'red' }} />
          <div style={{ width: 40, height: 40, background: 'green' }} />
        </Actions>
      </Machine>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Machine = styled.div`
  perspective: 200px;
  user-select: none;
  padding: ${UNIT}px;
  background: ${COLORS.gray[100]};
`;

const InnerWrapper = styled.div`
  position: relative;
`;

const ChildWrapper = styled.div`
  position: relative;
  z-index: 1;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15);
`;

const TopPanel = styled.div`
  position: absolute;
  width: 100%;
  height: 15px;
  top: -15px;
  left: 0;
  right: 0;
  background: ${COLORS.gray[300]};
  transform: rotateX(25deg);
  transform-origin: bottom center;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default SlopesCanvasWrapper;
