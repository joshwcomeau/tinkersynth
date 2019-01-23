/**
 * Helpers for the SlopesState reducer + assorted state-management stuff
 */

export const getDerivedDisabledParams = params => {
  return {
    ballSize: params.polarAmount === 0,
    amplitudeAmount: params.splitUniverse === 100,
    octaveAmount: params.splitUniverse === 100,
    wavelength: params.splitUniverse === 100,
    waterBoilAmount: params.splitUniverse === 100,
  };
};

export const generateRandomValuesForParameters = () => {
  return {};

  isRandomized.current = true;

  setSeed(getRandomSeed());
  setPerspective(getRandomSliderValue());

  // Some parameters don't need to be updated on every tick.
  if (Math.random() > 0.5) {
    setPeaksCurve(getRandomPeaksCurve());
  }
  if (Math.random() > 0.25) {
    setPersonInflateAmount(getRandomSliderValue());
  }
  if (Math.random() > 0.25) {
    // Amplitudes below 25 or above 75 don't really look good
    setAmplitudeAmount(random(25, 75));
  }
  if (Math.random() > 0.25) {
    setWavelength(random(25, 75));
  }

  setDotAmount(Math.random() > 0.75 ? getRandomSliderValue() : 0);

  if (Math.random() > 0.75) {
    setOctaveAmount(Math.random() > 0.5 ? getRandomSliderValue() : 0);
  }

  // Certain parameters make more sense at one of the extremities, so let's
  // increase the chances of those.
  const polarAmount = sample([0, 0, 0, 100, 100, getRandomSliderValue()]);
  setPolarAmount(polarAmount);

  if (polarAmount > 0 && Math.random() > 0.5) {
    setBallSize(getRandomSliderValue());
  }

  const omega =
    polarAmount === 0 ? 0 : sample([0, 100, getRandomSliderValue()]);
  setOmega(omega);

  const waterBoilAmount = sample([100, getRandomSliderValue()]);
  setWaterBoilAmount(waterBoilAmount);

  const spikyness = sample([0, 0, 0, 100, getRandomSliderValue()]);
  setSpikyness(spikyness);

  if (spikyness > 0) {
    setStaticAmount(Math.random() > 0.5 ? getRandomSliderValue() : 0);
  } else {
    setStaticAmount(0);
  }

  // splitUniverse is _such_ a drastic effect. Let's make it stick to 0
  // most of the time.
  const splitUniverse = sample([0, 0, 0, 0, getRandomSliderValue()]);
  setSplitUniverse(splitUniverse);

  // Performance suffers when we add lots of lines. Let's keep it generally
  // to a pretty low number
  setLineAmount(
    sample([5, 10, 20, 30, 35, 40, 40, 50, 50, 50, 60, getRandomSliderValue()])
  );

  // If we're splitting the universe, we almost always want occlusion to be
  // off.
  const enableOcclusion =
    splitUniverse > 0
      ? sample([
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          true,
        ])
      : getRandomBooleanValue();
  setEnableOcclusion(enableOcclusion);
};
