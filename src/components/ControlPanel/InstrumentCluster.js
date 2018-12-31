// @flow
import styled from 'styled-components';

import { UNIT } from '../../constants';

export default styled.div`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 2px;
  padding: ${UNIT}px;
  margin-bottom: ${UNIT * 2}px;
`;
