import React from 'react';
import styled from 'styled-components';

import { COLORS, UNIT } from '../../constants';

import Link from '../Link';

const Engraving = () => (
  <Note>
    <FirstLine title="A generative art machine. By Josh Comeau.">
      A generative art machine.
      <br />
      By{' '}
      <strong>
        <Link to="https://twitter.com/JoshWComeau" target="_blank">
          Josh Comeau
        </Link>
      </strong>
      .
    </FirstLine>
    {/* <SecondLine>
          <Link to="" style={{ color: 'inherit' }}>
            📕 Documentation
          </Link>
        </SecondLine> */}
  </Note>
);

const Note = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  text-align: right;
  color: ${COLORS.gray[400]};
  line-height: 1.3;
  text-shadow: 0px -0.5px 0px rgba(0, 0, 0, 0.5),
    0px 0.5px 0px rgba(255, 255, 255, 0.9);
`;

const FirstLine = styled.div`
  font-size: 16px;
`;

const SecondLine = styled.div`
  font-size: 12px;
`;

export default Engraving;
