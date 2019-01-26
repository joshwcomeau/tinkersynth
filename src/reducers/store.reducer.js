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

type State = {
  // Keyed by machine name.
  [string]: {
    format: 'print' | 'vector',
    size: {
      width: number,
      height: number,
    },
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

export default reducer;
