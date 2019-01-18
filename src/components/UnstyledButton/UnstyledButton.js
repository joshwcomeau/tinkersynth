import styled from 'styled-components';

import { COLORS } from '../../constants';

export default styled.button`
  all: unset;
  display: block;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;

  &:focus {
    outline: auto;
    outline-color: ${COLORS.pink[300]};
  }

  &:focus:not(.focus-visible) {
    outline: none;
  }
`;
