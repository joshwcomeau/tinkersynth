import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoadingLilButtons = () => {
  return (
    <svg width="24" height="17" viewBox="0 0 24 17" fill="none">
      <rect width="24" height="17" rx="4" fill="#2B2B2B" />
      <Circle1 cx="7.5" cy="8.5" r="3.5" />
      <Circle2 cx="16.5" cy="8.5" r="3.5" />
    </svg>
  );
};

const glowing = keyframes`
  0% {
    opacity: 0;
  }

  60% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;

const Circle = styled.circle`
  fill: #d90000;
`;

const Circle1 = styled(Circle)`
  animation: ${glowing} 2000ms linear infinite both;
`;
const Circle2 = styled(Circle)`
  animation: ${glowing} 1700ms 1000ms linear infinite both;
`;

export default LoadingLilButtons;
