// @flow
import React from 'react';

type Props = {
  size: number,
  inline?: boolean,
};

const Spacer = ({ size, inline }: Props) => (
  <div
    style={{
      width: size,
      height: size,
      display: inline ? 'inline-block' : 'block',
    }}
  />
);

export default Spacer;
