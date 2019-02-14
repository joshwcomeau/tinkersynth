import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const FadeIn = styled.div`
  animation: ${fadeIn} ${props => props.duration || 500}ms
    ${props => props.delay || 0}ms both;
`;

export default FadeIn;
