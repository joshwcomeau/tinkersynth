import styled from 'styled-components';

const Svg = styled.svg`
  display: block;
  overflow: ${props => (props.hideOverflow ? 'hidden' : 'visible')};
  backface-visibility: hidden;
  fill: none;
`;

export default Svg;
