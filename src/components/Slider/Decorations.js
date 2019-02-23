// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

import Notches from './Notches';

type Props = {
  height: number,
  value: number,
  numOfNotches: number,
};

const Decorations = ({ height, value, numOfNotches }: Props) => {
  const topDiff = height * ((value - 100) / 100);
  const trackExtensionTop = value > 100 ? -topDiff : 0;
  const bottomDiff = height * (value / 100);
  const trackExtensionBottom = value < 0 ? bottomDiff : 0;

  return (
    <Wrapper>
      <Notches num={numOfNotches} position="left" />
      <Track
        style={{
          top: trackExtensionTop,
          bottom: trackExtensionBottom,
        }}
      />
      <Notches num={numOfNotches} position="right" />
    </Wrapper>
  );
};

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
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 2px;
  background: ${COLORS.gray[100]};
  border-radius: 2px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);
`;

// $FlowIgnore
export default React.memo(Decorations);
