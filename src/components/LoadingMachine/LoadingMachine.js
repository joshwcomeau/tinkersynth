// @flow
import React from 'react';
import styled from 'styled-components';
import LoadingCase from './LoadingCase';

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
        {/* TODO */}
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
`;

export default LoadingMachine;
