import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';
import lakituSrc from '../../images/lakitu.png';

const HiddenTopShelf = () => {
  return (
    <Wrapper>
      <Lakitu src={lakituSrc} style={{ height: 46 }} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  transform: translateY(-100%);
  background: ${COLORS.black};
  color: ${COLORS.white};
`;

const Lakitu = styled.img``;

export default HiddenTopShelf;
