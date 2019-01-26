import React from 'react';
import styled, { keyframes } from 'styled-components';

const scale = keyframes`
  0% {
    transform: scaleX(0.5);
  }
  70% {
    transform: scaleX(1.1);
  }
  100% {
    transform: scaleX(1);
  }
`;
const translate = keyframes`
  0% {
    transform: translateY(10px);
  }
  50% {
    transform: translateY(-2px);
  }
  100% {
    transform: translateY(0);
  }
`;

const BounceIn = ({ children }) => {
  return (
    <Wrapper>
      <Scale>
        <Translate>{children}</Translate>
      </Scale>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* display: inline-block; */
  perspective: 200px;
`;

const Scale = styled.div`
  animation: ${scale} 200ms;
  transform-origin: center center;
`;

const Translate = styled.div`
  animation: ${translate} 200ms;
  transform-origin: center center;
`;

export default BounceIn;
