// @flow
import React from 'react';
import styled from 'styled-components';

import { UNIT, COLORS } from '../../constants';

import Spacer from '../Spacer';
import SlopesCanvasActions from './SlopesCanvasActions';

type Props = {
  children: React$Node,
};

const SlopesCanvasWrapper = ({ children, toggles }: Props) => {
  return (
    <Wrapper>
      <Machine>
        <TopPanel />
        <InnerWrapper>
          <ChildWrapper>{children}</ChildWrapper>
        </InnerWrapper>

        <Spacer size={UNIT} />

        <Footer>
          <Toggles>
            <SlopesCanvasActions />
          </Toggles>

          <div style={{ width: 38, height: 38, background: 'green' }} />
        </Footer>
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

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Toggles = styled.div``;

export default SlopesCanvasWrapper;
