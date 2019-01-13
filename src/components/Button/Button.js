import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

const Button = React.forwardRef(
  ({ onTrigger, color, children, ...delegated }, ref) => {
    return (
      <Wrapper
        ref={ref}
        onClick={onTrigger}
        {...delegated}
        style={{
          color,
          borderColor: color,
        }}
      >
        {children}
      </Wrapper>
    );
  }
);

const Wrapper = styled.button`
  all: unset;
  display: block;
  margin: 0;
  padding: 8px 16px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 100px;
  border-width: 2px;
  border-style: solid;
  font-size: 14px;

  &:focus {
    outline: auto;
    outline-color: ${COLORS.pink[300]};
  }

  &:focus:not(.focus-visible) {
    outline: none;
  }
`;

export default Button;
