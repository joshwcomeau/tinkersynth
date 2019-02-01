// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS, UNIT } from '../../constants';

import LoadingMachine from '../LoadingMachine';
import Spacer from '../Spacer';
import Heading from '../Heading';

const Loading = () => {
  return (
    <Wrapper>
      <LoadingMachine />
      <Spacer size={UNIT * 4} />
      {/* <Heading size={4} style={{ color: COLORS.white }}>
        Loading...
      </Heading> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${COLORS.gray[700]};
`;

export default Loading;
