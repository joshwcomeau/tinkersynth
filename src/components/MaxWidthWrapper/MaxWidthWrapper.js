// @flow
import React from 'react';
import styled from 'styled-components';

import { BREAKPOINTS, BREAKPOINT_SIZES, MAX_WIDTH } from '../../constants';

import { getPadding } from './MaxWidthWrapper.helpers';

type Props = {};

const MaxWidthWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: ${props => props.maxWidth || MAX_WIDTH.base};
  margin-left: auto;
  margin-right: auto;
  padding-left: ${getPadding};
  padding-right: ${getPadding};

  @media ${BREAKPOINTS.sm} {
    max-width: 100%;
  }

  @media ${BREAKPOINTS.lgMin} {
    max-width: ${props => props.maxWidth || BREAKPOINT_SIZES.lg + 'px'};
  }
`;

export default (props: Props) => <MaxWidthWrapper {...props} />;
