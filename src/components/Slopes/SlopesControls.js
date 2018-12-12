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
      {/* TODO: Better sliders */}
      <input
        type="range"
        min="0"
        max="100"
        value={perspective}
        onChange={ev => setPerspective(Number(ev.target.value))}
      />
      <br />
      <input
        type="range"
        min="0"
        max="100"
        value={spikyness}
        onChange={ev => setSpikyness(Number(ev.target.value))}
      />
      <br />
      <input
        type="range"
        min="0"
        max="100"
        value={polarAmount}
        onChange={ev => setPolarAmount(Number(ev.target.value))}
      />

      <div style={{ padding: '2rem' }}>
        <Slider
          value={perspective}
          updateValue={setPerspective}
          min={0}
          max={100}
        />
      </div>
    </div>
  );
};

export default SlopesControls;
