import React from 'react';
import styled from 'styled-components';

import { UNIT } from '../../constants';

import { SlopesContext } from './SlopesState';

const ACTION_SIZE = 38;

const SlopesCanvasMargins = ({ width, height }) => {
  const slopesParams = React.useContext(SlopesContext);

  const topBottomMargin = slopesParams.enableMargins ? (height / 11) * 1 : UNIT;
  const sideMargin = slopesParams.enableMargins ? (width / 8.5) * 1 : UNIT;

  return (
    <>
      <TopMargin style={{ height: topBottomMargin }} />
      <LeftMargin style={{ width: sideMargin }} />
      <RightMargin style={{ width: sideMargin }} />
      <BottomMargin style={{ height: topBottomMargin }} />
    </>
  );
};

const Margin = styled.div`
  position: absolute;
  z-index: 2;
  background: white;
`;

const TopMargin = styled(Margin)`
  top: 0;
  left: 0;
  right: 0;
`;
const LeftMargin = styled(Margin)`
  top: 0;
  left: 0;
  bottom: 0;
`;
const RightMargin = styled(Margin)`
  top: 0;
  right: 0;
  bottom: 0;
`;
const BottomMargin = styled(Margin)`
  left: 0;
  right: 0;
  bottom: 0;
`;

export default SlopesCanvasMargins;
