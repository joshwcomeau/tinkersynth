import React from 'react';
import styled from 'styled-components';

const SimpleTable = styled.table`
  width: 100%;
  text-align: left;
  border: 1px solid rgba(0, 0, 0, 0.1);

  & th,
  & td {
    padding: 6px 4px;
    margin: 0;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  & th {
    background: rgba(0, 0, 0, 0.1);
    border-bottom: 2px solid rgba(0, 0, 0, 0.3);
  }
`;

export default SimpleTable;
