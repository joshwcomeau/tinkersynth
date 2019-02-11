import React from 'react';
import styled, { keyframes } from 'styled-components';

const Spin = ({ duration = 1500, children }) => {
  return <Wrapper duration={duration}>{children}</Wrapper>;
};

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Wrapper = styled.div`
  animation: ${spin} ${props => props.duration}ms linear infinite;
  transform-origin: center center;

  /* HACK */
  & svg,
  & > div {
    display: block !important;
  }
`;

export default Spin;
