// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { COLORS, UNIT } from '../../constants';
import * as actions from '../../actions';

import MaxWidthWrapper from '../MaxWidthWrapper';

const SlopesStorefront = ({ printWidth, printHeight }) => {
  return <div>Hello World</div>;
};

const mapStateToProps = state => ({
  storeData: state.store.slopes,
});

const mapDispatchToProps = {
  selectFormat: actions.selectFormat,
  selectSize: actions.selectSize,
};

export default connect(mapStateToProps)(SlopesStorefront);
