// @flow
import React, { useState } from 'react';

import { sample } from '../../utils';

// $FlowFixMe
export const SlopesContext = React.createContext({});

const DEFAULT_PEAKS_CURVE = {
  startPoint: [0.5, 0],
  controlPoint1: [0.5, 0.5],
  endPoint: [0.5, 1],
};

type Props = {
  children: React$Node,
};

const getRandomSeed = () =>
  // Seeds are 16-bit, with 65,536 possible values (from 0-65535)
  Math.round(Math.random() * 65535);

const getRandomSliderValue = () =>
  // All sliders ought to be 0-100
  Math.round(Math.random() * 100);

const getRandomBooleanValue = () => sample([true, false]);

export const SlopesProvider = ({ children }: Props) => {
  // High-level "Parameters", tweakable settings
  const defaultSeed = getRandomSeed();
  const [seed, setSeed] = useState(defaultSeed);

  const [perspective, setPerspective] = useState(40);
  const [spikyness, setSpikyness] = useState(0);
  const [polarAmount, setPolarAmount] = useState(0);
  const [omega, setOmega] = useState(0);
  const [splitUniverse, setSplitUniverse] = useState(0);
  const [personInflateAmount, setPersonInflateAmount] = useState(25);
  const [wavelength, setWavelength] = useState(25);
  const [waterBoilAmount, setWaterBoilAmount] = useState(100);
  const [ballSize, setBallSize] = useState(50);

  const [enableOcclusion, setEnableOcclusion] = useState(true);
  const [enableLineBoost, setEnableLineBoost] = useState(false);

  const [peaksCurve, setPeaksCurve] = useState(DEFAULT_PEAKS_CURVE);

  // We have a "randomize" button that sets arbitrary values for every control.
  const randomize = () => {
    setSeed(getRandomSeed());

    setPerspective(getRandomSliderValue());
    setSpikyness(getRandomSliderValue());
    setPolarAmount(getRandomSliderValue());
    setOmega(getRandomSliderValue());
    setSplitUniverse(getRandomSliderValue());
    setPersonInflateAmount(getRandomSliderValue());
    setWavelength(getRandomSliderValue());
    setWaterBoilAmount(getRandomSliderValue());
    setBallSize(getRandomSliderValue());

    setEnableOcclusion(getRandomBooleanValue());
  };

  // Sometimes, values in 1 parameter will disable others.
  // For example, when polarRatio is 0, "ballSize" doesn't do anything, since
  // it controls the size of the polar hole.
  const disabledParams = {
    ballSize: polarAmount === 0,
  };

  return (
    <SlopesContext.Provider
      value={{
        seed,
        setSeed,
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
        waterBoilAmount,
        setWaterBoilAmount,
        ballSize,
        setBallSize,
        disabledParams,
        randomize,
      }}
    >
      {children}
    </SlopesContext.Provider>
  );
};
