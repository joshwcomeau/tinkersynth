import styled from 'styled-components';

import { COLORS } from '../../constants';

export default styled.button`
  display: block;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;

  &:focus {
    outline: 2px solid ${COLORS.pink[300]};
    outline-offset: 2px;
  }

  &:focus:not(.focus-visible) {
    outline: none;
  }
`;
