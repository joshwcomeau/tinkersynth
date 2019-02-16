// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Waypoint from 'react-waypoint';

import * as actions from '../../actions';
import { COLORS, UNIT } from '../../constants';
import { getCost } from '../../reducers/store.reducer';
import analytics from '../../services/analytics.service';
import consoleTableSrc from '../../images/wide-console-table.svg';
import pottedPlantSrc from '../../images/potted-plant.svg';

import MaxWidthWrapper from '../MaxWidthWrapper';
import Heading from '../Heading';
import Asterisk from '../Asterisk';
import Spacer from '../Spacer';
import TextLink from '../TextLink';
import Paragraph from '../Paragraph';
import OrderOption from '../OrderOption';
import OrderFormat from '../OrderFormat';
import StorefrontRow from '../StorefrontRow';
import StorefrontPreviewDecorations from '../StorefrontPreviewDecorations';
import SlopesCanvasPreview from './SlopesCanvas.preview';
import Pricetag from '../Pricetag';
import UnstyledButton from '../UnstyledButton';
import MountUponEnteringViewport from '../MountUponEnteringViewport';
import LoadScript from '../LoadScript';
import SlopesPurchaseButton from './SlopesPurchaseButton';

const BACKDROP_HEIGHT = 300;
const SECOND_COLUMN_CUTOFF = 1104;

const SlopesStorefront = ({
  printWidth,
  printHeight,
  storeData,
  cost,
  isAwareOfPurchaseOptions,
  selectFormat,
  selectSize,
  discoverStorefront,
}) => {
  const asteriskTooltipContents = (
    <span style={{ display: 'block', maxWidth: 360 }}>
      There are >10³² possible creations with this machine. For comparison,
      there's only about 10¹⁹ grains of sand on the planet.
      <br />
      <br />
      It's a safe bet that your creation is one-of-a-kind.
    </span>
  );

  return (
    <Wrapper id="slopes-storefront">
      <Backdrop style={{ height: BACKDROP_HEIGHT }} />

      <MainContent>
        <FirstColumn>
          <Header style={{ height: BACKDROP_HEIGHT }}>
            <Heading size={1}>Magnificent!</Heading>
            <Spacer size={UNIT * 4} />
            <Paragraph as="div" style={{ fontSize: 24 }}>
              You have created a unique
              <Asterisk tooltip={asteriskTooltipContents} /> piece of art.
              <br />
              Display it proudly!
            </Paragraph>
          </Header>

          <Spacer size={UNIT * 10} />

          <StorefrontRow
            title="Select format:"
            subtitle={
              <>
                <TextLink to="/faq?q=purchase-options">Learn more</TextLink>{' '}
                about the available options.
              </>
            }
          >
            <OrderFormat
              format={storeData.format}
              handleChangeFormat={value => {
                analytics.logEvent('change-purchase-kind', {
                  machineName: 'slopes',
                  kind: value,
                });
                selectFormat('slopes', value);
              }}
            />
          </StorefrontRow>

          {storeData.format === 'print' && (
            <>
              <Spacer size={UNIT * 6} />
              <OrderOption
                label="Select a size:"
                options={[
                  { label: '12” × 18”', id: 'small' },
                  { label: '18” × 24”', id: 'medium' },
                  { label: '24” × 36”', id: 'large' },
                ]}
                selectedId={storeData.size}
                handleChange={value => {
                  analytics.logEvent('change-purchase-size', {
                    machineName: 'slopes',
                    size: value,
                  });

                  selectSize('slopes', value);
                }}
              />
            </>
          )}

          <Spacer size={UNIT * 6} />

          <StorefrontRow
            title="Total:"
            subtitle="(Includes shipping worldwide)"
          >
            <Pricetag cost={cost} />
          </StorefrontRow>

          <Spacer size={UNIT * 6} />

          <StorefrontRow>
            <PurchaseRowContents>
              <Waypoint
                onEnter={() => {
                  if (isAwareOfPurchaseOptions) {
                    return;
                  }

                  window.setTimeout(discoverStorefront, 500);
                }}
              >
                <span>
                  <SlopesPurchaseButton />
                </span>
              </Waypoint>

              <Spacer size={UNIT * 6} />

              <MultiplePurchaseInfoButton>
                Want to buy multiple?
              </MultiplePurchaseInfoButton>
            </PurchaseRowContents>
          </StorefrontRow>
        </FirstColumn>

        <SecondColumn>
          <Foreground>
            <ConsoleTable src={consoleTableSrc} />
            <PottedPlant src={pottedPlantSrc} />
          </Foreground>

          <Background>
            <SlopesCanvasPreview key={storeData.size} size={storeData.size} />

            <StorefrontPreviewDecorations size={storeData.size} />
          </Background>
        </SecondColumn>
      </MainContent>

      {/*
        HACK: Need enough space for the table to not be obfuscated by the
              site footer
      */}
      <Spacer size={UNIT * 24} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const Backdrop = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  background: #f3f3f5;
  box-shadow: inset 0px 20px 50px rgba(0, 0, 0, 0.05);
`;

const Foreground = styled.div`
  position: relative;
  z-index: 2;
`;
const Background = styled.div`
  position: relative;
  z-index: 1;
`;
const MainContent = styled(MaxWidthWrapper)`
  position: relative;
  z-index: 2;
  display: flex;
`;

const Column = styled.div`
  position: relative;
  flex: 1;
`;

const FirstColumn = styled(Column)`
  /*
  In desktop mode, we want to ensure our column takes up exactly 650px, so that
  the options display correctly
  */
  min-width: 650px;
  max-width: 650px;

  /* In mobile, though, it just becomes 100% of the width */
  @media (max-width: ${SECOND_COLUMN_CUTOFF}px) {
    margin: auto;
  }

  /* In mobile, though, it just becomes 100% of the width */
  @media (max-width: 650px) {
    min-width: 100%;
    max-width: 100%;
  }
`;

const SecondColumn = styled(Column)`
  @media (max-width: ${SECOND_COLUMN_CUTOFF}px) {
    display: none;
  }
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ConsoleTable = styled.img`
  position: absolute;
  width: 735px;
  top: 525px;
  left: 45px;
`;

const PottedPlant = styled.img`
  position: absolute;
  width: 128px;
  top: 367px;
  left: 400px;
`;

const PurchaseRowContents = styled.div`
  display: flex;
`;

const MultiplePurchaseInfoButton = styled(UnstyledButton)``;

const mapStateToProps = state => ({
  storeData: state.store.slopes,
  isAwareOfPurchaseOptions: state.machine.isAwareOfPurchaseOptions,
  cost: getCost('slopes')(state),
});

const mapDispatchToProps = {
  selectFormat: actions.selectFormat,
  selectSize: actions.selectSize,
  discoverStorefront: actions.discoverStorefront,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SlopesStorefront);
