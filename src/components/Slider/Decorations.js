// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

import Notches from './Notches';

type Props = {
  numOfNotches: number,
};

const Decorations = ({ numOfNotches }: Props) => (
  <Wrapper>
    <Notches num={numOfNotches} position="left" />
    <Track />
    <Notches num={numOfNotches} position="right" />
  </Wrapper>
);

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
`;

const Track = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  width: 2px;
  height: 100%;
  background: ${COLORS.gray[100]};
  border-radius: 2px;
`;

export default React.memo(Decorations);
