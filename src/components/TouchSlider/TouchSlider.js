// @flow
import React, { useEffect } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';
import { clamp, normalize } from '../../utils';
import useBoundingBox from '../../hooks/bounding-box.hook';

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
  const [ref, boundingBox] = useBoundingBox();

  const dots = [];

  const handleClick = ev => {
    if (!boundingBox) {
      return;
    }

    // Figure out what value this click represents, from 0-100.
    // We want to make it easier to select edge values (0 and 100), so we'll
    // pad it a bit
    const CLICK_PADDING_AMOUNT = 8;
    const paddedBoundingBox = {
      left: boundingBox.left + CLICK_PADDING_AMOUNT,
      width: boundingBox.width - CLICK_PADDING_AMOUNT * 2,
    };
    const relativeLeft = ev.clientX - paddedBoundingBox.left;
    const ratio = clamp(relativeLeft / paddedBoundingBox.width, 0, 1);

    const newValue = normalize(ratio, 0, 1, min, max);

    updateValue(newValue);
  };

  return (
    <div ref={ref} style={{ width, height }} onClick={handleClick}>
      Hello {dots}
    </div>
  );
};

export default TouchSlider;
