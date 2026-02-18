/**
 * Helpers for the SlopesState reducer + assorted state-management stuff
 */
import { useEffect } from 'react';

import { sample, random } from '../../utils';

export const DEFAULT_PEAKS_CURVE = {
  startPoint: [0.5, 0],
  controlPoint1: [0.5, 0.5],
  endPoint: [0.5, 1],
};

export const useUndo = handleUndo => {
  // On mount, register the listener for the "undo" shortcut.
  useEffect(() => {
    const handleKeyup = ev => {
      // Support cmd+z as well as ctrl+z
      const modifierKeyPressed = ev.ctrlKey || ev.metaKey;

      if (ev.key === 'z' && modifierKeyPressed) {
        // Don't use the browser's standard "undo".
        ev.preventDefault();

        handleUndo();
      }
    };

    window.addEventListener('keydown', handleKeyup);

    return () => {
      window.removeEventListener('keydown', handleKeyup);
    };
  }, []);
};

export const updateDisabledParams = (disabledObj, params) => {
  disabledObj.current.ballSize = params.polarAmount === 0;
  disabledObj.current.amplitudeAmount = params.splitUniverse === 100;
  disabledObj.current.octaveAmount = params.splitUniverse === 100;
  disabledObj.current.wavelength = params.splitUniverse === 100;
  disabledObj.current.waterBoilAmount =
    params.splitUniverse === 100 || params.spikyness === 100;
  disabledObj.current.peaksCurveAmount = params.splitUniverse === 100;
  disabledObj.current.omega = params.polarAmount === 0;
  disabledObj.current.omega = params.polarAmount === 0;
  disabledObj.current.staticAmount =
    params.spikyness === 0 || params.splitUniverse === 100;
};

export const shuffleParameters = state => {
  // To allow shuffles to be repeated in quick succession, disable
  // transitioning the canvas drawing
  state.animateTransitions = false;

  // We also need to add the current state to the history, so that the shuffle
  // can be undone
  state.history.push({
    parameters: { ...state.parameters },
    timestamp: Date.now(),
  });

  // Every randomization will tweak the seed #
  state.parameters.seed = getRandomSeed();

  // Other parameters will only be updated sometimes.
  // This is mainly for performance, although being able to control the
  // likeliness of specific parameters also allows us to curate the shuffle
  // a bit.
  if (Math.random() > 0.5) {
    state.parameters.perspective = getRandomSliderValue();
  }
  if (Math.random() > 0.5) {
    state.parameters.peaksCurve = getRandomPeaksCurve();
  }
  if (Math.random() > 0.25) {
    state.parameters.peaksCurveAmount = getRandomSliderValue();
  }
  if (Math.random() > 0.25) {
    // Amplitudes below 25 don't really look good
    state.parameters.amplitudeAmount = random(25, 100);
  }
  if (Math.random() > 0.25) {
    // High wavelengths look really busy, so let's keep the value low-ish.
    state.parameters.wavelength = random(0, 70);
  }
  if (Math.random() > 0.75) {
    state.parameters.octaveAmount =
      Math.random() > 0.5 ? getRandomSliderValue() : 0;
  }

  // Dots should be a rare treat
  state.parameters.dotAmount = Math.random() > 0.8 ? getRandomSliderValue() : 0;

  // Certain parameters make more sense at one of the extremities, so let's
  // increase the chances of those.
  state.parameters.polarAmount = sample([
    0,
    0,
    0,
    100,
    100,
    getRandomSliderValue(),
  ]);

  if (state.parameters.polarAmount > 0 && Math.random() > 0.5) {
    state.parameters.ballSize = getRandomSliderValue();
  }

  state.parameters.omega =
    state.parameters.polarAmount === 0
      ? 0
      : sample([0, 100, getRandomSliderValue()]);

  state.parameters.waterBoilAmount = sample([100, getRandomSliderValue()]);

  state.parameters.spikyness = sample([0, 0, 0, 100, getRandomSliderValue()]);

  if (state.parameters.spikyness > 0) {
    state.parameters.staticAmount =
      Math.random() > 0.5 ? getRandomSliderValue() : 0;
  } else {
    state.parameters.staticAmount = 0;
  }

  // splitUniverse is _such_ a drastic effect. Let's make it stick to 0
  // most of the time.
  state.parameters.splitUniverse = sample([
    0,
    0,
    0,
    0,
    0,
    0,
    getRandomSliderValue(),
  ]);

  // Performance suffers when we add lots of lines. Let's keep it generally
  // to a pretty low number
  state.parameters.lineAmount = sample([
    5,
    10,
    20,
    30,
    35,
    40,
    40,
    50,
    50,
    50,
    60,
    getRandomSliderValue(),
  ]);

  // If we're splitting the universe, we almost always want occlusion to be
  // off.
  state.parameters.enableOcclusion =
    state.parameters.splitUniverse > 0
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

  if (Math.random() > 0.25) {
    state.parameters.lineThicknessAmount = sample([
      2.5,
      5,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      15,
      20,
      20,
      20,
      30,
      50,
      75,
      100,
      100,
      getRandomSliderValue(),
    ]);
  }

  if (Math.random() > 0.5) {
    state.parameters.resolution = sample([
      1,
      5,
      5,
      5,
      7,
      7,
      7,
      8,
      8,
      8,
      10,
      10,
      10,
      15,
      15,
      20,
      20,
      25,
      30,
      35,
      40,
      50,
      50,
      50,
      50,
      50,
      50,
      50,
      50,
      50,
      50,
      50,
      50,
      50,
      50,
      50,
      getRandomSliderValue(),
    ]);
  }

  // IF splitUniverse is non-zero, having low resolution can lead to
  // invisible canvases. Let's avoid this.
  if (state.parameters.splitUniverse > 0 && state.parameters.resolution < 20) {
    state.parameters.resolution = 50;
  }

  return state;
};

export const getRandomSeed = () =>
  // Seeds are 16-bit, with 65,536 possible values (from 0-65535)
  Math.round(Math.random() * 65535);

const getRandomSliderValue = () =>
  // All sliders ought to be 0-100
  Math.round(Math.random() * 100);

const getRandomBooleanValue = () => sample([true, false]);

const getRandomPeaksCurve = () => {
  // Let's have some sensible "standard" curves to sample from.
  const presetCurves = [
    DEFAULT_PEAKS_CURVE,
    {
      // This one is a straight line along the top
      startPoint: [0, 1],
      controlPoint1: [0.5, 1],
      endPoint: [1, 1],
    },
    {
      // Rainbow
      startPoint: [0.1, 0.2],
      controlPoint1: [0.5, 1],
      endPoint: [0.9, 0.2],
    },
    {
      // Diagonal line (polar corkscrew)
      startPoint: [0, 1],
      controlPoint1: [0.55, 0.55],
      endPoint: [1, 0],
    },
  ];

  // Let's also add a chance to generate one totally at random
  const shouldUseRandomCurve = Math.random() > 0.5;

  return shouldUseRandomCurve
    ? {
        startPoint: [Math.random(), Math.random()],
        controlPoint1: [Math.random(), Math.random()],
        endPoint: [Math.random(), Math.random()],
      }
    : sample(presetCurves);
};

const DEBOUNCE_CUTOFF = 500;
export const isUpdatePartOfGroup = lastSnapshot => {
  const timeDeltaMs = Date.now() - lastSnapshot.timestamp;

  return timeDeltaMs < DEBOUNCE_CUTOFF;
};
