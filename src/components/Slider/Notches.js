// @flow
import React from 'react';
import styled from 'styled-components';

import { range } from '../../utils';

type Props = {
  num: number,
  position: 'left' | 'right',
};

const Notches = ({ num, position }: Props) => {
  return (
    <Wrapper position={position}>
      {range(num).map(i => (
        <Notch key={i} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: ${props =>
    props.position === 'left' ? 'flex-start' : 'flex-end'};
`;

const Notch = styled.div`
  width: 4px;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1px;
`;

export default React.memo(Notches);
