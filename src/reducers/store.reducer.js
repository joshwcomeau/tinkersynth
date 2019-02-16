/**
 * This reducer holds the specifics of the current requested printing
 * dimensions.
 *
 * Note that our current solution has no "shopping cart".
 * In the future, I can either use an OSS solution, or manage it myself with a
 * "cart reducer". In that case, I imagine once an item is finished, it'd be
 * "popped" from this reducer into a cart reducer, a list of formats/sizes.
 */
import produce from 'immer';

import { calculateCost } from '../helpers/store.helpers';

type State = {
  // Keyed by machine name.
  [string]: {
    format: 'print' | 'vector' | 'combo',
    size: 'small' | 'medium' | 'large',
  },
};

const initialState = {
  slopes: {
    format: 'print',
    size: 'medium',
  },
};

const reducer = produce((state = initialState, action) => {
  const { type, machineName } = action;

  switch (type) {
    case 'SELECT_FORMAT': {
      state[machineName].format = action.format;
      return state;
    }

    case 'SELECT_SIZE': {
      state[machineName].size = action.size;
      return state;
    }

    default:
      return state;
  }
});

// Selectors
export const getSlopes = state => state.store.slopes;

export const getCost = machineName => state => {
  const { format, size } = state.store[machineName];

  return calculateCost(format, size);
};

export default reducer;
