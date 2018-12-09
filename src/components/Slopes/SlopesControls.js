// @flow
import React from 'react';

type Props = {
  perspective: number,
  setPerspective: (num: number) => void,
  spikyness: number,
  setSpikyness: (num: number) => void,
};

const SlopesControls = ({
  perspective,
  spikyness,
  setPerspective,
  setSpikyness,
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

      <input
        type="range"
        min="0"
        max="100"
        value={spikyness}
        onChange={ev => setSpikyness(Number(ev.target.value))}
      />
    </div>
  );
};

export default SlopesControls;
