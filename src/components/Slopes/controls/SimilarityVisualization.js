// @flow
import React from 'react';

import { COLORS } from '../../../constants';

import Svg from '../../Svg';
import FadeAfterChange from '../../FadeAfterChange';
import BoilingWater from './BoilingWater';
import BoilingSteam from './BoilingSteam';

type Props = {
  size: number,
  value: number,
  isAnimated: boolean,
};

const SimilarityVisualization = ({ size, value, isAnimated }: Props) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      {/* Steam */}
      {isAnimated && (
        <FadeAfterChange as="g" value={value} sustain={500} release={2000}>
          <BoilingSteam value={value} strength={1} offset={0} />
          <BoilingSteam value={value} strength={1} offset={5} />
          <BoilingSteam value={value} strength={1} offset={10} />
          <BoilingSteam value={value} strength={1} offset={15} />
          <BoilingSteam value={value} strength={1} offset={20} />
        </FadeAfterChange>
      )}
      {/* Burner */}
      <path
        d="M8.5 27L11 29.5L13.5 27L16 29.5L18.5 27L21 29.5L23.5 27"
        stroke={COLORS.red[300]}
        strokeOpacity={Math.min(value / 50, 100)}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Beaker */}
      <path
        d="M24 6V22C24 23.1046 23.1046 24 22 24H10.1951C9.09055 24 8.19512 23.1046 8.19512 22V8.88342C8.19512 8.3207 7.95806 7.78401 7.5421 7.40503L6 6"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
      />
      {/* Water */}
      <BoilingWater
        value={value}
        left={11}
        top={12}
        width={10}
        height={9}
        color={COLORS.aqua[300]}
        perlinRow={0.04}
        isAnimated={isAnimated}
      />
    </Svg>
  );
};

export default SimilarityVisualization;
