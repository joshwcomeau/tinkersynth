// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Transition, animated } from 'react-spring';
import styled from 'styled-components';

import * as actions from '../../actions';
import { HEADER_HEIGHT, UNIT } from '../../constants';

import Toast from '../Toast';

const ToastManager = ({ toasts, dismissToast }) => {
  return (
    <Wrapper>
      <Transition
        native
        items={toasts}
        keys={item => item.id}
        from={{ transform: 'scaleX(0)' }}
        enter={{ transform: 'scaleX(1)' }}
        leave={{ transform: 'scaleX(0)' }}
      >
        {toast => props => (
          <ToastWrapper style={props}>
            <Toast
              key={toast.id}
              id={toast.id}
              title={toast.title}
              message={toast.message}
              dismissToast={dismissToast}
            />
          </ToastWrapper>
        )}
      </Transition>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  z-index: 3;
  top: ${HEADER_HEIGHT + UNIT}px;
  right: ${UNIT}px;
  padding: ${UNIT * 2}px;
`;

const ToastWrapper = styled(animated.div)`
  position: absolute;
  top: 0;
  right: 0;
  will-change: transform;
  transform-origin: center right;
`;

const mapStateToProps = state => {
  const { toasts } = state;

  return {
    toasts,
  };
};

const mapDispatchToProps = {
  dismissToast: actions.dismissToast,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(ToastManager));
