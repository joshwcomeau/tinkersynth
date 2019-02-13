// @flow
import styled from 'styled-components';

import { UNIT, COLORS } from '../../constants';

export default styled.div`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  border: 1px solid ${COLORS.gray[400]};
  background: ${COLORS.gray[100]};
  border-radius: 2px;
  padding: ${UNIT}px;
`;
