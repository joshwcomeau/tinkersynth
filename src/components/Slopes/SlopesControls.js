// @flow
import React from 'react';

import SliderControl from '../SliderControl';

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
        <SliderControl
          value={perspective}
          updateValue={setPerspective}
          min={0}
          max={100}
          width={152}
          height={96}
          renderVisualization={value => <div>{Math.round(value)}</div>}
        />
      </div>

      <div style={{ padding: '2rem' }}>
        <SliderControl
          value={spikyness}
          updateValue={setSpikyness}
          min={0}
          max={100}
          width={152}
          height={96}
          renderVisualization={value => <div>{Math.round(value)}</div>}
        />
      </div>

      <div style={{ padding: '2rem' }}>
        <SliderControl
          value={polarAmount}
          updateValue={setPolarAmount}
          min={0}
          max={100}
          width={152}
          height={96}
          renderVisualization={value => <div>{Math.round(value)}</div>}
        />
      </div>
    </div>
  );
};

export default SlopesControls;
