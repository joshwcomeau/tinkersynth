// @flow
import React, { useRef, useState, useEffect, useReducer } from 'react';
import produce from 'immer';

import {
  DEFAULT_PEAKS_CURVE,
  useUndo,
  getDerivedDisabledParams,
  shuffleParameters,
  getRandomSeed,
} from './SlopesState.helpers';

const HISTORY_SIZE_LIMIT = 5;

export const SlopesContext = React.createContext({});

export type ToggleParameterAction = (parameterName: string) => void;
export type TweakParameterAction = (key: string, value: any) => void;
export type RandomizeAction = () => void;

const initialState = {
  history: [],
  isShuffled: false,
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
      state.isShuffled = false;

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

    case 'SHUFFLE': {
      // NOTE: I'm mutating the `state` object passed in, but that's OK since
      // it's using immer.
      return shuffleParameters(state);
    }

    case 'UNDO': {
      if (state.history.length === 0) {
        return state;
      }

      console.log(state.history);

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

export const SlopesProvider = ({ children }: { children: React$Node }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
    })
  );

  const undo = useRef(() =>
    dispatch({
      type: 'UNDO',
    })
  );

  useUndo(undo.current);

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
        shuffle: shuffle.current,

        isShuffled: state.isShuffled,

        disabledParams: getDerivedDisabledParams(state.parameters),
      }}
    >
      {children}
    </SlopesContext.Provider>
  );
};
