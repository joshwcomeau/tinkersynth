// @flow
import React from 'react';

import Slider from '../Slider';

type Props = {
  perspective: number,
  setPerspective: (num: number) => void,
  spikyness: number,
  setSpikyness: (num: number) => void,
};

const SlopesControls = ({
  perspective,
  spikyness,
  polarAmount,
  setPerspective,
  setSpikyness,
  setPolarAmount,
}: Props) => {
  return (
    <div>
      <div style={{ padding: '2rem' }}>
        <Slider
          value={perspective}
          updateValue={setPerspective}
          min={0}
          max={100}
        />
      </div>

      <div style={{ padding: '2rem' }}>
        <Slider
          value={spikyness}
          updateValue={setSpikyness}
          min={0}
          max={100}
        />
      </div>

      <div style={{ padding: '2rem' }}>
        <Slider
          value={polarAmount}
          updateValue={setPolarAmount}
          min={0}
          max={100}
        />
      </div>
    </div>
  );
};

export default SlopesControls;
