// @flow
import React, { useRef, useState, useEffect, useReducer } from 'react';
import produce from 'immer';

import {
  DEFAULT_PEAKS_CURVE,
  useUndo,
  getDerivedDisabledParams,
  shuffleParameters,
  getRandomSeed,
  isUpdatePartOfGroup,
} from './SlopesState.helpers';
import { sum, mean } from '../../utils';

import type { Curve } from '../../types';

const HISTORY_SIZE_LIMIT = 5;

export const SlopesContext = React.createContext({});

export type ToggleParameterAction = (parameterName: string) => void;
export type TweakParameterAction = (key: string, value: any) => void;
export type RandomizeAction = () => void;

type HistorySnapshot = {
  parameters: any,
  timestamp: number, // Unix epoch
};

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

type State = {
  history: Array<HistorySnapshot>,
  isShuffled: boolean,
  parameters: {
    seed: number,
    enableDarkMode: boolean,
    enableMargins: boolean,
    enableOcclusion: boolean,
    amplitudeAmount: number,
    wavelength: number,
    octaveAmount: number,
    perspective: number,
    lineAmount: number,
    spikyness: number,
    staticAmount: number,
    polarAmount: number,
    omega: number,
    splitUniverse: number,
    personInflateAmount: number,
    waterBoilAmount: number,
    ballSize: number,
    dotAmount: number,
    peaksCurve: Curve,
  },
};

let times = [];

const reducer = produce(
  (state: State, action): State => {
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

        // If this is the first action in a "burst", we want to push the state
        // onto the history stack, for undoing.
        //
        // I don't want to just save every action, because while a user drags
        // a slider, it can create dozens of subtle state changes.
        //
        // The easiest thing is just to debounce it, only tracking the first in a
        // batch.
        const lastHistorySnapshot = state.history[state.history.length - 1];
        const isFirstInBatch =
          !lastHistorySnapshot || !isUpdatePartOfGroup(lastHistorySnapshot);

        if (isFirstInBatch) {
          const newHistorySnapshot = {
            parameters: action.payload,
            timestamp: Date.now(),
          };

          state.history.push(newHistorySnapshot);

          if (state.history.length > HISTORY_SIZE_LIMIT) {
            state.history.shift();
          }
        } else {
          // If this is just one of many in the batch, I should update the
          // timestamp
          if (lastHistorySnapshot) {
            lastHistorySnapshot.timestamp = Date.now();
          }
        }

        // Update the state, by copying every value in the payload into state.
        Object.keys(action.payload).forEach(key => {
          state.parameters[key] = action.payload[key];
        });

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

        const lastState = state.history.pop();

        state.parameters = {
          ...state.parameters,
          ...lastState.parameters,
        };

        return state;

        // TODO
      }

      default:
        return state;
    }
  }
);

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
