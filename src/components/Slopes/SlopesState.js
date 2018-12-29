// @flow
import React, { useState } from 'react';

export const SlopesContext = React.createContext({});

const DEFAULT_PEAKS_CURVE = {
  startPoint: [0.5, 0],
  controlPoint1: [0.5, 0.5],
  endPoint: [0.5, 1],
};

export const SlopesProvider = ({ children }) => {
  // High-level "Parameters", tweakable settings
  const [perspective, setPerspective] = useState(40);
  const [spikyness, setSpikyness] = useState(0);
  const [polarAmount, setPolarAmount] = useState(0);
  const [omega, setOmega] = useState(0);
  const [splitUniverse, setSplitUniverse] = useState(0);
  const [personInflateAmount, setPersonInflateAmount] = useState(25);
  const [wavelength, setWavelength] = useState(25);
  const [selfSimilarity, setSelfSimilarity] = useState(100);

  const [enableOcclusion, setEnableOcclusion] = useState(true);
  const [enableLineBoost, setEnableLineBoost] = useState(false);

  const [peaksCurve, setPeaksCurve] = useState(DEFAULT_PEAKS_CURVE);
  const updatePointInPeaksCurve = (name, point) => {
    setPeaksCurve({
      ...peaksCurve,
      [name]: point,
    });
  };

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
        peaksCurve,
        setPeaksCurve,
        personInflateAmount,
        setPersonInflateAmount,
        wavelength,
        setWavelength,
        selfSimilarity,
        setSelfSimilarity,
      }}
    >
      {children}
    </SlopesContext.Provider>
  );
};
