// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Tooltip } from 'react-tippy';
import styled from 'styled-components';

import {
  UNIT,
  COLORS,
  LIGHT_BACKGROUND,
  DARK_BACKGROUND,
} from '../../constants';
import * as actions from '../../actions';
import analytics from '../../services/analytics.service';

import Spacer from '../Spacer';
import Button from '../Button';
import { SlopesContext } from './SlopesState';
import PageCluster from './controls/PageCluster';
import SlopesCanvasMargins from './SlopesCanvasMargins';
import PoweredOffCanvas from './PoweredOffCanvas';
import UnstyledButton from '../UnstyledButton';

type Props = {
  width: number,
  height: number,
  children: React$Node,
  enableDarkMode: boolean,
  enableMargins: boolean,
  isAwareOfPurchaseOptions: boolean,
  isPoweredOn: boolean,
};

// Show the tooltip after 2 minutes
const SHOW_PURCHASE_TOOLTIP_AFTER = 1000 * 60 * 2;

const handleClickPurchase = () => {
  analytics.logEvent('click-smaller-purchase', { machineName: 'slopes' });

  // HACK: I've totally broken out of React's abstraction here, because the
  // alternative is more work.
  const storefrontEl = document.querySelector('#slopes-storefront');

  const storefrontVerticalOffset = storefrontEl.getBoundingClientRect().top;

  window.scrollTo({
    top: storefrontVerticalOffset + window.pageYOffset,
    left: 0,
    behavior: 'smooth',
  });
};

const useTooltip = isAwareOfPurchaseOptions => {
  const [shouldShowTooltip, setShouldShowTooltip] = React.useState(false);

  const timeoutId = React.useRef(null);

  React.useEffect(() => {
    if (isAwareOfPurchaseOptions) {
      return;
    }

    timeoutId.current = window.setTimeout(() => {
      setShouldShowTooltip(true);
    }, SHOW_PURCHASE_TOOLTIP_AFTER);
  }, []);

  React.useEffect(
    () => {
      if (isAwareOfPurchaseOptions) {
        window.clearTimeout(timeoutId.current);
        setShouldShowTooltip(false);
      }
    },
    [isAwareOfPurchaseOptions]
  );

  const dismissTooltip = () => {
    setShouldShowTooltip(false);
  };

  return [shouldShowTooltip, dismissTooltip];
};

const SlopesCanvasWrapper = ({
  width,
  height,
  children,
  enableDarkMode,
  enableMargins,
  isAwareOfPurchaseOptions,
  isPoweredOn,
}: Props) => {
  const [showPurchaseTooltip, setShowPurchaseTooltip] = React.useState(false);

  const [shouldShowTooltip, dismissTooltip] = useTooltip(
    isAwareOfPurchaseOptions
  );

  return (
    <Wrapper>
      <Machine>
        <TopPanel />

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
          <Toggles>
            <PageCluster />
          </Toggles>

          <Tooltip
            animation="fade"
            animateFill={false}
            arrow={true}
            position="bottom"
            html={
              <TooltipContents onClick={dismissTooltip}>
                <strong>Happy with your design?</strong>
                <br />
                <br />
                You can purchase it as a print,
                <br />
                or as a vector image.
              </TooltipContents>
            }
            open={shouldShowTooltip}
            style={{
              lineHeight: 1.4,
            }}
          >
            <Button color={COLORS.blue[500]} onClick={handleClickPurchase}>
              Purchase
            </Button>
          </Tooltip>
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
  padding-top: 50px; /* Needs to line up with ControlPanel's top margin */
`;

const Machine = styled.div`
  position: sticky;
  top: 28px;
  perspective: 200px;
  user-select: none;
  padding: ${UNIT}px;
  background: ${COLORS.gray[100]};
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

const TooltipContents = styled(UnstyledButton)`
  font-size: 15px;
  color: ${COLORS.white};
  text-align: center;
`;

const mapStateToProps = state => {
  return {
    isAwareOfPurchaseOptions: state.machine.isAwareOfPurchaseOptions,
  };
};

export default connect(mapStateToProps)(SlopesCanvasWrapperContainer);
