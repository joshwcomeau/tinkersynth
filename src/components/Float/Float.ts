import React from 'react';
import styled, { keyframes } from 'styled-components';

const animation = keyframes`
  0% {
    transform: translateY(-10px);
  }
  50% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(-10px);
  }
`;

export default styled.div`
  animation: ${animation} 10s infinite;
`;
