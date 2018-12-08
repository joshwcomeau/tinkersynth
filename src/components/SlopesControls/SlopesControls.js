// @flow
import React from 'react';

type Props = {
  lineDensity: number,
  setLineDensity: (num: number) => void,
};

const SlopesControls = ({ lineDensity, setLineDensity }: Props) => {
  return (
    <div>
      <input
        type="range"
        min="0"
        max="75"
        value={lineDensity * 10}
        onChange={ev => setLineDensity(Number(ev.target.value) / 10)}
      />
    </div>
  );
};

export default SlopesControls;
