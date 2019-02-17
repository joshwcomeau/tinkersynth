// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Waypoint from 'react-waypoint';

import * as actions from '../../actions';
import { COLORS, UNIT, BREAKPOINT_SIZES } from '../../constants';
import { getCost } from '../../reducers/store.reducer';
import analytics from '../../services/analytics.service';
import consoleTableSrc from '../../images/wide-console-table.svg';
import pottedPlantSrc from '../../images/potted-plant.svg';

import MaxWidthWrapper from '../MaxWidthWrapper';
import Heading from '../Heading';
import FadeIn from '../FadeIn';
import Asterisk from '../Asterisk';
import Spacer from '../Spacer';
import Link from '../Link';
import TextLink from '../TextLink';
import Paragraph from '../Paragraph';
import OrderFormat from '../OrderFormat';
import OrderSize from '../OrderSize';
import StorefrontRow from '../StorefrontRow';
import StorefrontPreviewDecorations from '../StorefrontPreviewDecorations';
import SlopesCanvasPreview from './SlopesCanvas.preview';
import Pricetag from '../Pricetag';
import UnstyledButton from '../UnstyledButton';
import MountUponEnteringViewport from '../MountUponEnteringViewport';
import LoadScript from '../LoadScript';
import SlopesPurchaseButton from './SlopesPurchaseButton';

const BACKDROP_HEIGHT = 300;
const SECOND_COLUMN_CUTOFF = BREAKPOINT_SIZES.lg;

const SlopesStorefront = ({
  printWidth,
  printHeight,
  storeData,
  cost,
  windowDimensions,
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

  // HACK - I ran into many issues trying to combine position: sticky and
  // overflow: hidden, to avoid horizontal scrollbars for the console table
  // and potted plant sticking outside the viewport.
  // My fix is to add an overflow: hidden _inside_ the position sticky, but for
  // that to work I need to know the exact width of that column. So I work it
  // out in JS.
  const maxWrapperWidth = BREAKPOINT_SIZES.lg;
  const secondColumnWidth = 441; //
  const sidePadding = (windowDimensions.width - maxWrapperWidth) / 2;
  const secondColumnTrimWidth = secondColumnWidth + sidePadding;

  const { format, size } = storeData;

  const showSizeOptions = format === 'print' || format === 'combo';

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
                <TextLink
                  to="/faq?q=purchase-options"
                  onClick={ev => {
                    ev.preventDefault();
                    window.open('/faq?q=purchase-options');
                  }}
                >
                  Learn more
                </TextLink>{' '}
                about the
                <br />
                available options.
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

          {showSizeOptions && (
            <FadeIn>
              <Spacer size={UNIT * 8} />
              <StorefrontRow title="Choose a size:">
                <OrderSize
                  size={storeData.size}
                  handleChangeSize={value => {
                    analytics.logEvent('change-purchase-size', {
                      machineName: 'slopes',
                      size: value,
                    });

                    selectSize('slopes', value);
                  }}
                />
              </StorefrontRow>
            </FadeIn>
          )}

          {storeData.format && (
            <FadeIn>
              <Spacer size={UNIT * 8} />

              <StorefrontRow title="Price:">
                <Indent>
                  <Pricetag cost={cost} />
                </Indent>
              </StorefrontRow>

              <Spacer size={UNIT * 8} />

              <StorefrontRow>
                <PurchaseRowContents>
                  <SlopesPurchaseButton />

                  <Spacer size={UNIT * 6} />

                  <MultiplePurchaseInfoButton
                    as={Link}
                    to="/faq?q=multiple-purchases"
                    onClick={ev => {
                      ev.preventDefault();
                      window.open('/faq?q=multiple-purchases');
                    }}
                  >
                    Want to buy multiple?
                  </MultiplePurchaseInfoButton>
                </PurchaseRowContents>
              </StorefrontRow>
            </FadeIn>
          )}

          <Waypoint
            onEnter={() => {
              if (isAwareOfPurchaseOptions) {
                return;
              }

              window.setTimeout(discoverStorefront, 500);
            }}
          >
            {/* Add a healthy amount of space below */}
            <span>
              <Spacer size={UNIT * 24} />
            </span>
          </Waypoint>
        </FirstColumn>

        <SecondColumn>
          <StickyWrapper>
            <ContentWrapper style={{ width: secondColumnTrimWidth }}>
              <Foreground>
                <ConsoleTable src={consoleTableSrc} />
                <PottedPlant src={pottedPlantSrc} />
              </Foreground>

              <Background>
                <SlopesCanvasPreview
                  key={storeData.size}
                  size={storeData.size}
                />

                <StorefrontPreviewDecorations size={storeData.size} />
              </Background>
            </ContentWrapper>
          </StickyWrapper>
        </SecondColumn>
      </MainContent>
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

const StickyWrapper = styled.div`
  position: sticky;
  top: 0;
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
  height: 441px;
  top: 525px;
  left: 45px;
`;

const Indent = styled.div`
  padding-left: 30px;
`;

const PottedPlant = styled.img`
  position: absolute;
  width: 128px;
  top: 367px;
  left: 400px;
`;

const PurchaseRowContents = styled(Indent)`
  display: flex;
`;

const ContentWrapper = styled.div`
  position: relative;
  overflow: hidden;
  height: 974px;
`;

const MultiplePurchaseInfoButton = styled(UnstyledButton)`
  line-height: 48px;
`;

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
