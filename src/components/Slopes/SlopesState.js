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

const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_PARAMETER': {
      const { parameterName } = action;

      return produce(state, draftState => {
        const currentValue = draftState.parameters[parameterName];

        draftState.parameters[parameterName] = !currentValue;
      });
    }

    case 'TWEAK_PARAMETER': {
      // TODO: Should I have a single action per parameter? Would I save a bunch
      // of re-renders if I did that?
      return produce(state, draftState => {
        draftState.isRandomized = false;

        draftState.history.push(state.parameters);
        if (draftState.history.length > HISTORY_SIZE_LIMIT) {
          draftState.history.shift();
        }

        draftState.parameters = {
          ...state.parameters,
          ...action.payload,
        };
      });
    }

    case 'RANDOMIZE': {
      // TODO
    }

    case 'UNDO': {
      if (state.history.length === 0) {
        return state;
      }

      return produce(state, draftState => {
        const lastState = draftState.history.pop();

        draftState.parameters = {
          ...draftState.parameters,
          ...lastState,
        };

        return draftState;
      });
      // TODO
    }

    default:
      return state;
  }
};

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

  const toggleParameter = parameterName =>
    dispatch({
      type: 'TOGGLE_PARAMETER',
      parameterName,
    });

  return (
    <SlopesContext.Provider
      value={{
        disabledParams: getDerivedDisabledParams(state.parameters),

        isRandomized: state.isRandomized,

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

        toggleParameter,

        toggleDarkMode: () => toggleParameter('enableDarkMode'),
        toggleMargins: () => toggleParameter('enableMargins'),
        toggleOcclusion: () => toggleParameter('enableOcclusion'),
        setSeed: seed =>
          dispatch({ type: 'TWEAK_PARAMETER', payload: { seed } }),
        setAmplitudeAmount: amplitudeAmount =>
          dispatch({ type: 'TWEAK_PARAMETER', payload: { amplitudeAmount } }),
        setOctaveAmount: octaveAmount =>
          dispatch({ type: 'TWEAK_PARAMETER', payload: { octaveAmount } }),
        setPerspective: perspective =>
          dispatch({ type: 'TWEAK_PARAMETER', payload: { perspective } }),
        setLineAmount: lineAmount =>
          dispatch({ type: 'TWEAK_PARAMETER', payload: { lineAmount } }),
        setSpikyness: spikyness =>
          dispatch({ type: 'TWEAK_PARAMETER', payload: { spikyness } }),
        setStaticAmount: staticAmount =>
          dispatch({ type: 'TWEAK_PARAMETER', payload: { staticAmount } }),
        setPolarAmount: polarAmount =>
          dispatch({ type: 'TWEAK_PARAMETER', payload: { polarAmount } }),
        setOmega: omega =>
          dispatch({ type: 'TWEAK_PARAMETER', payload: { omega } }),
        setSplitUniverse: splitUniverse =>
          dispatch({ type: 'TWEAK_PARAMETER', payload: { splitUniverse } }),
        setPeaksCurve: peaksCurve =>
          dispatch({ type: 'TWEAK_PARAMETER', payload: { peaksCurve } }),
        setPersonInflateAmount: personInflateAmount =>
          dispatch({
            type: 'TWEAK_PARAMETER',
            payload: { personInflateAmount },
          }),
        setWavelength: wavelength =>
          dispatch({ type: 'TWEAK_PARAMETER', payload: { wavelength } }),
        setWaterBoilAmount: waterBoilAmount =>
          dispatch({ type: 'TWEAK_PARAMETER', payload: { waterBoilAmount } }),
        setBallSize: ballSize =>
          dispatch({ type: 'TWEAK_PARAMETER', payload: { ballSize } }),
        setDotAmount: dotAmount =>
          dispatch({ type: 'TWEAK_PARAMETER', payload: { dotAmount } }),

        randomize: () => dispatch({ type: 'RANDOMIZE' }),
      }}
    >
      {children}
    </SlopesContext.Provider>
  );
};
