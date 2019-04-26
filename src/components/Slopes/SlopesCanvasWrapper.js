// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { UNIT, COLORS } from '../../constants';
import * as actions from '../../actions';
import slopesPlacardMobile from '../../images/slopes-placard-mobile.png';

import Spacer from '../Spacer';
import Button from '../Button';
import BigOminousButton from '../BigOminousButton';
import { SlopesContext } from './SlopesState';
import PlacardArea from './controls/PlacardArea';
import ColorCluster from './controls/ColorCluster';
import { InstrumentCluster } from '../ControlPanel';

import DestructiveCluster from './controls/DestructiveCluster';
import PoweredOffCanvas from './PoweredOffCanvas';
import UnstyledButton from '../UnstyledButton';

type Props = {
  width: number,
  height: number,
  isFullExperience: boolean,
  toggleDownloadShelf: () => void,
  children: React$Node,
  isPoweredOn: boolean,
  rememberCurrentlyFocusedElement: (ref: HTMLElement) => any,
};

const SlopesCanvasWrapper = ({
  width,
  height,
  isFullExperience,
  toggleDownloadShelf,
  children,
  isPoweredOn,
  rememberCurrentlyFocusedElement,
}: Props) => {
  const downloadButtonRef = React.useRef(null);

  return (
    <Wrapper>
      <Machine>
        <TopPanel />

        {!isFullExperience && (
          <Header>
            <PlacardWrapper>
              <img src={slopesPlacardMobile} style={{ width: 176 }} />
            </PlacardWrapper>

            <DestructiveCluster />
          </Header>
        )}

        <InnerWrapper>
          {!isPoweredOn && <PoweredOffCanvas />}
          <ChildWrapper>{children}</ChildWrapper>
        </InnerWrapper>

        <Spacer size={UNIT} />

        <Footer>
          <ColorCluster size={48} />

          <Button
            ref={downloadButtonRef}
            color={COLORS.blue[500]}
            size="large"
            onClick={() => {
              toggleDownloadShelf();

              if (downloadButtonRef.current) {
                // After the user closes the shelf, we want to restore focus
                // to this button, to make sure the focus is where we left off.
                rememberCurrentlyFocusedElement(downloadButtonRef.current);
              }
            }}
          >
            Download
          </Button>
        </Footer>
      </Machine>
    </Wrapper>
  );
};

// $FlowIgnore
const OptimizedSlopesCanvasWrapper = React.memo(SlopesCanvasWrapper);

const SlopesCanvasWrapperContainer = (props: any) => {
  const slopesParams = React.useContext(SlopesContext);

  return (
    <OptimizedSlopesCanvasWrapper
      {...props}
      isPoweredOn={slopesParams.isPoweredOn}
    />
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 450px) {
    padding-top: 4px;
  }

  @media (min-width: 451px) {
    padding-top: 50px; /* Needs to line up with ControlPanel's top margin */
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: ${UNIT}px;
  padding-bottom: ${UNIT}px;
`;

const Machine = styled.div`
  perspective: 200px;
  user-select: none;
  padding: ${UNIT}px;
  background: ${COLORS.gray[100]};
`;

const PlacardWrapper = styled.div`
  transform: translateY(-10px);
`;

const InnerWrapper = styled.div`
  position: relative;
  padding: 2px;
`;

const ChildWrapper = styled.div`
  position: relative;
  z-index: 1;
  background: #000;
`;

const TopPanel = styled.div`
  position: absolute;
  width: 100%;
  height: 15px;
  top: -15px;
  left: 0;
  right: 0;
  background: linear-gradient(to top, ${COLORS.gray[400]}, ${COLORS.gray[500]});
  transform: rotateX(25deg);
  transform-origin: bottom center;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Toggles = styled.div``;

export default connect(
  null,
  { rememberCurrentlyFocusedElement: actions.rememberCurrentlyFocusedElement }
)(SlopesCanvasWrapperContainer);
