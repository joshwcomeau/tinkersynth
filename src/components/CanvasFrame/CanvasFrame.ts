import styled from 'styled-components';
import { COLORS } from '../../constants';

const CanvasFrame = styled.div`
  border-style: solid;
  border-width: 6px;
  border-top-color: hsl(0, 0%, 40%);
  border-left-color: hsl(0, 0%, 20%);
  border-right-color: hsl(0, 0%, 20%);
  border-bottom-color: hsl(0, 0%, 5%);
  background: ${COLORS.white};
  border-radius: 2px;
  padding: 5px;
`;

export default CanvasFrame;
