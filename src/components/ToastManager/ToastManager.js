// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Toast from '../Toast';

const ToastManager = ({ toasts }) => {
  return (
    <Wrapper>
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          kind={toast.kind}
          title={toast.title}
          message={toast.message}
        />
      ))}
    </Wrapper>
  );
};

const mapStateToProps = state => {
  const { toasts } = state;

  return {
    toasts,
  };
};

const Wrapper = styled.div``;

export default connect(mapStateToProps)(ToastManager);
