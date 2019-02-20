import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';
import { range } from '../../utils';

const Notches = ({ num }: Props) => {
  return (
    <NotchesWrapper>
      {range(num).map(i => (
        <Notch key={i} />
      ))}
    </NotchesWrapper>
  );
};

const NotchesWrapper = styled.div`
  flex: 1;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const Notch = styled.div`
  width: 1px;
  height: 6px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 1px;
`;

const Decorations = ({ numOfNotches }: Props) => (
  <DecorationsWrapper>
    <Notches num={numOfNotches} />
    <Track />
    <Notches num={numOfNotches} />
  </DecorationsWrapper>
);

const DecorationsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Track = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  height: 2px;
  width: 100%;
  background: ${COLORS.gray[100]};
  border-radius: 2px;
`;

export default Decorations;
