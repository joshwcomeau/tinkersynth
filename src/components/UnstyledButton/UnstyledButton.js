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
    outline: 2px solid ${COLORS.pink[300]};
    outline-offset: 2px;
  }

  &:focus:not(.focus-visible) {
    outline: none;
  }
`;
