// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { COLORS, UNIT } from '../../constants';
import actions from '../../actions';

import MaxWidthWrapper from '../MaxWidthWrapper';

const SlopesStorefront = ({ printWidth, printHeight }) => {
  const windowDimensions = useWindowDimensions();

  // Our aspect ratio depends on the size selected.
  // By default, our size is 18 x 24.
  const aspectRatio = printWidth / printHeight;

  // By default, canvases are 552px tall.
  // This odd number is a factor of both aspect ratios (0.75 and 0.66).
  // TODO: Should I make this responsive? Shrink when the window is too short?
  const canvasHeight = 552;
  const canvasWidth = canvasHeight * aspectRatio;

  const exportHeight = windowDimensions.height;
  const exportWidth = exportHeight * aspectRatio;

  return (
    <SlopesProvider>
      <MachineWrapper>
        <Row>
          <SlopesCanvasWrapper width={canvasWidth} height={canvasHeight}>
            <SlopesCanvas width={canvasWidth} height={canvasHeight} />
          </SlopesCanvasWrapper>

          <SlopesControls width={600} />
        </Row>
      </MachineWrapper>

      <StorefrontWrapper>
        <SlopesStorefront />
      </StorefrontWrapper>

      <SlopesExport width={exportWidth} height={exportHeight} />
    </SlopesProvider>
  );
};

const MachineWrapper = styled.div`
  position: relative;
  background: ${COLORS.gray[700]};
  padding-bottom: ${UNIT * 8}px;
`;

const Row = styled(MaxWidthWrapper)`
  display: flex;
`;

const StorefrontWrapper = styled.div`
  margin-top: ${UNIT}px;
`;

const mapStateToProps = state => ({
  storeData: state.store.slopes,
});

const mapDispatchToProps = {
  selectFormat: actions.selectFormat,
  selectSize: actions.selectSize,
};

export default connect(mapStateToProps)(SlopesStorefront);
