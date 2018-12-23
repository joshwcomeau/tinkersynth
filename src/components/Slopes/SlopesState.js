// @flow
import React, { useState } from 'react';

export const SlopesContext = React.createContext({});

export const SlopesProvider = ({ children }) => {
  // High-level "Parameters", tweakable settings
  const [perspective, setPerspective] = useState(100);
  const [spikyness, setSpikyness] = useState(0);
  const [polarAmount, setPolarAmount] = useState(0);
  const [omega, setOmega] = useState(0);
  const [splitUniverse, setSplitUniverse] = useState(0);

  const [enableOcclusion, setEnableOcclusion] = useState(true);
  const [enableLineBoost, setEnableLineBoost] = useState(false);

  return (
    <SlopesContext.Provider
      value={{
        perspective,
        setPerspective,
        spikyness,
        setSpikyness,
        polarAmount,
        setPolarAmount,
        omega,
        setOmega,
        splitUniverse,
        setSplitUniverse,
        enableOcclusion,
        setEnableOcclusion,
        enableLineBoost,
        setEnableLineBoost,
      }}
    >
      {children}
    </SlopesContext.Provider>
  );
};
