// @flow
import React from 'react';

type Props = {
  perspective: number,
  setPerspective: (num: number) => void,
};

const SlopesControls = ({ perspective, setPerspective }: Props) => {
  return (
    <div>
      {/* TODO: Better sliders */}
      <input
        type="range"
        min="0"
        max="75"
        value={perspective * 10}
        onChange={ev => setPerspective(Number(ev.target.value) / 10)}
      />
    </div>
  );
};

export default SlopesControls;
