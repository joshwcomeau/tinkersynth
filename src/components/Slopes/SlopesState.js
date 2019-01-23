// @flow
import React, { useRef, useState, useEffect, useReducer } from 'react';
import produce from 'immer';

import { sample, random } from '../../utils';
import useToggle from '../../hooks/toggle.hook';

import {
  getDerivedDisabledParams,
  generateRandomValuesForParameters,
} from './SlopesState.helpers';

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

const history = [];

const getRandomSeed = () =>
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
  const useRandomCurve = Math.random() > 0.5;

  return useRandomCurve
    ? {
        startPoint: [Math.random(), Math.random()],
        controlPoint1: [Math.random(), Math.random()],
        endPoint: [Math.random(), Math.random()],
      }
    : sample(presetCurves);
};

const initialState = {
  history: [],
  // TODO: rename `isRandomized` -> `enableAnimations`
  isRandomized: false,
  parameters: {
    seed: getRandomSeed(),
    enableDarkMode: false,
    enableMargins: true,
    enableOcclusion: true,
    amplitudeAmount: 50,
    wavelength: 25,
    octaveAmount: 0,
    perspective: 40,
    lineAmount: 45,
    spikyness: 0,
    staticAmount: 0,
    polarAmount: 0,
    omega: 0,
    splitUniverse: 0,
    personInflateAmount: 50,
    waterBoilAmount: 100,
    ballSize: 50,
    dotAmount: 0,
    peaksCurve: DEFAULT_PEAKS_CURVE,
  },
};

const HISTORY_SIZE_LIMIT = 5;

const reducer = produce((state, action) => {
  switch (action.type) {
    case 'TOGGLE_PARAMETER': {
      const { parameterName } = action;

      const currentValue = state.parameters[parameterName];

      state.parameters[parameterName] = !currentValue;

      return state;
    }

    case 'TWEAK_PARAMETER': {
      // TODO: Should I have a single action per parameter? Would I save a bunch
      // of re-renders if I did that?
      state.isRandomized = false;

      state.history.push(state.parameters);
      if (state.history.length > HISTORY_SIZE_LIMIT) {
        state.history.shift();
      }

      state.parameters = {
        ...state.parameters,
        ...action.payload,
      };

      return state;
    }

    case 'RANDOMIZE': {
      // TODO
    }

    case 'UNDO': {
      if (state.history.length === 0) {
        return state;
      }

      const lastState = state.history.pop();

      state.parameters = {
        ...state.parameters,
        ...lastState,
      };

      return state;

      // TODO
    }

    default:
      return state;
  }
});

export type ToggleParameterAction = (parameterName: string) => void;
export type TweakParameterAction = (key: string, value: any) => void;
export type RandomizeAction = () => void;

export const SlopesProvider = ({ children }: Props) => {
  // OK this provider does _a lot_. Let's break it down.

  //
  ////// 1. PARAMETERS
  //
  // First, we have the state itself, for all the different high-level
  // parameters that the user can tweak.
  const [state, dispatch] = useReducer(reducer, initialState);

  const isRandomized = useRef(false);

  // On mount, register the listener for the "undo" shortcut.
  useEffect(() => {
    const handleKeyup = ev => {
      // Support cmd+z as well as ctrl+z
      const modifierKeyPressed = ev.ctrlKey || ev.metaKey;

      if (ev.key === 'z' && modifierKeyPressed) {
        // Don't use the browser's standard "undo".
        ev.preventDefault();

        dispatch({ type: 'UNDO' });
      }
    };

    window.addEventListener('keydown', handleKeyup);

    return () => {
      window.removeEventListener('keydown', handleKeyup);
    };
  }, []);

  // ACTIONS
  const toggleParameter = useRef(parameterName =>
    dispatch({
      type: 'TOGGLE_PARAMETER',
      parameterName,
    })
  );

  const tweakParameter = useRef((key, value) =>
    dispatch({
      type: 'TWEAK_PARAMETER',
      payload: { [key]: value },
    })
  );

  const shuffle = useRef(() =>
    dispatch({
      type: 'SHUFFLE',
      payload: { [key]: value },
    })
  );

  return (
    <SlopesContext.Provider
      value={{
        seed: state.parameters.seed,
        enableDarkMode: state.parameters.enableDarkMode,
        enableMargins: state.parameters.enableMargins,
        amplitudeAmount: state.parameters.amplitudeAmount,
        octaveAmount: state.parameters.octaveAmount,
        perspective: state.parameters.perspective,
        lineAmount: state.parameters.lineAmount,
        spikyness: state.parameters.spikyness,
        staticAmount: state.parameters.staticAmount,
        polarAmount: state.parameters.polarAmount,
        omega: state.parameters.omega,
        splitUniverse: state.parameters.splitUniverse,
        enableOcclusion: state.parameters.enableOcclusion,
        peaksCurve: state.parameters.peaksCurve,
        personInflateAmount: state.parameters.personInflateAmount,
        wavelength: state.parameters.wavelength,
        waterBoilAmount: state.parameters.waterBoilAmount,
        ballSize: state.parameters.ballSize,
        dotAmount: state.parameters.dotAmount,

        toggleParameter: toggleParameter.current,
        tweakParameter: tweakParameter.current,

        isRandomized: state.isRandomized,

        disabledParams: getDerivedDisabledParams(state.parameters),

        shuffle,
      }}
    >
      {children}
    </SlopesContext.Provider>
  );
};
