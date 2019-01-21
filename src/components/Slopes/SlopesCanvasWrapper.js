// @flow
import React from 'react';
import styled from 'styled-components';

import {
  UNIT,
  COLORS,
  LIGHT_BACKGROUND,
  DARK_BACKGROUND,
} from '../../constants';

import Spacer from '../Spacer';
import Button from '../Button';
import SlopesCanvasActions from './SlopesCanvasActions';
import SlopesCanvasMargins from './SlopesCanvasMargins';
import { SlopesContext } from './SlopesState';

type Props = {
  width: number,
  height: number,
  children: React$Node,
};

const SlopesCanvasWrapper = ({ width, height, children, toggles }: Props) => {
  const slopesParams = React.useContext(SlopesContext);

  return (
    <Wrapper>
      <Machine>
        <TopPanel />

        <InnerWrapper>
          <ChildWrapper
            style={{
              backgroundColor: slopesParams.enableDarkMode
                ? DARK_BACKGROUND
                : LIGHT_BACKGROUND,
            }}
          >
            {children}
          </ChildWrapper>
          <SlopesCanvasMargins
            width={width}
            height={height}
            enableDarkMode={slopesParams.enableDarkMode}
            enableMargins={slopesParams.enableMargins}
          />
        </InnerWrapper>

        <Spacer size={UNIT} />

        <Footer>
          <Toggles>
            <SlopesCanvasActions />
          </Toggles>

          <Button color={COLORS.blue[500]}>Purchase</Button>
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
