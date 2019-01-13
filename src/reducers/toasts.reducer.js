import type { Toast } from '../types';

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'BREAK_MACHINE_WITH_KEYBOARD': {
      return [...state, action.toast];
    }

    default: {
      return state;
    }
  }
};

export default reducer;
