// @flow
import React, { useEffect } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';
import { clamp, normalize } from '../../utils';

type Props = {
  value: number,
  updateValue: (num: number) => void,
  // Sliders work on a scale of 0-1 by default
  min?: number,
  max?: number,
  width: number,
  height: number,
  // Aesthetic choices
  dotSize?: number,
};

const TouchSlider = ({
  value,
  updateValue,
  min = 0,
  max = 1,
  width,
  height,
  dotSize = 4,
}: Props) => {
  const dots = [];

  return <Wrapper style={{ width, height }}>{dots}</Wrapper>;
};

const Wrapper = styled.div``;

export default TouchSlider;
