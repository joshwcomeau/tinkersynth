import type { Toast } from '../types';

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'BREAK_MACHINE_WITH_KEYBOARD': {
      // Don't allow multiple of the same error to be added to state
      const alreadyIncludesThisToast = state.some(
        toast => toast.id === action.toast.id
      );

      if (alreadyIncludesThisToast) {
        return state;
      }

      return [...state, action.toast];
    }

    case 'DISMISS_TOAST': {
      // This is kind of a dumb way to do this - I don't need to filter all
      // the items, I just need to splice a specific one out - but this will
      // always be a really short list so it doesn't really matter.
      return state.filter(toast => toast.id !== action.toastId);
    }

    default: {
      return state;
    }
  }
};

export default reducer;
