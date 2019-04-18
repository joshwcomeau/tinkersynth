// @flow
import React from 'react';
import styled from 'styled-components';

import {
  UNIT,
  COLORS,
  LIGHT_BACKGROUND,
  DARK_BACKGROUND,
} from '../../constants';
import * as actions from '../../actions';
import analytics from '../../services/analytics.service';
import slopesPlacardMobile from '../../images/slopes-placard-mobile.png';

import Spacer from '../Spacer';
import Button from '../Button';
import BigOminousButton from '../BigOminousButton';
import { SlopesContext } from './SlopesState';
import PlacardArea from './controls/PlacardArea';
import PageCluster from './controls/PageCluster';
import { InstrumentCluster } from '../ControlPanel';

import DestructiveCluster from './controls/DestructiveCluster';
import SlopesCanvasMargins from './SlopesCanvasMargins';
import PoweredOffCanvas from './PoweredOffCanvas';
import UnstyledButton from '../UnstyledButton';
import SlopesDownloadButton from './SlopesDownloadButton';

type Props = {
  width: number,
  height: number,
  isFullExperience: boolean,
  children: React$Node,
  enableDarkMode: boolean,
  enableMargins: boolean,
  isPoweredOn: boolean,
};

const SlopesCanvasWrapper = ({
  width,
  height,
  isFullExperience,
  children,
  enableDarkMode,
  enableMargins,
  isPoweredOn,
}: Props) => {
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
          <ChildWrapper
            style={{
              backgroundColor: enableDarkMode
                ? DARK_BACKGROUND
                : LIGHT_BACKGROUND,
            }}
          >
            {children}
          </ChildWrapper>
          <SlopesCanvasMargins
            width={width}
            height={height}
            enableDarkMode={enableDarkMode}
            enableMargins={enableMargins}
          />
        </InnerWrapper>

        <Spacer size={UNIT} />

        <Footer>
          <PageCluster size={isFullExperience ? 38 : 48} />

          <SlopesDownloadButton size={isFullExperience ? 'medium' : 'large'} />
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
      enableDarkMode={slopesParams.enableDarkMode}
      enableMargins={slopesParams.enableMargins}
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
  position: sticky;
  top: 28px;
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
`;

const TopPanel = styled.div`
  position: absolute;
  width: 100%;
  height: 15px;
  top: -15px;
  left: 0;
  right: 0;
  background: ${COLORS.gray[300]};
  transform: rotateX(25deg);
  transform-origin: bottom center;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Toggles = styled.div``;

export default SlopesCanvasWrapperContainer;
