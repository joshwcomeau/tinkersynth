// @flow
import React from 'react';
import styled from 'styled-components';

import { range } from '../../utils';

type Props = {
  num: number,
};

const Notches = ({ num }: Props) => {
  return (
    <Wrapper>
      {range(num).map(i => (
        <Notch key={i} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Notch = styled.div`
  width: 25%;
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 1px;
`;

export default React.memo(Notches);
