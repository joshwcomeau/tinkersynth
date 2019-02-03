// @flow
import React from 'react';
import styled from 'styled-components';

import Screw from './Screw';
import { range } from '../../utils';

type Props = {
  numOfScrews?: number,
};

const ScrewRow = ({ numOfScrews = 3 }: Props) => {
  return (
    <Wrapper>
      {range(numOfScrews).map(i => (
        <Screw size={7} key={i} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 7px;
`;

export default ScrewRow;
