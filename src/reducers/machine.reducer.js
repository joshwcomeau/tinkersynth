const initialState = {
  hasBeenBroken: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'BREAK_MACHINE_WITH_KEYBOARD': {
      return {
        ...state,
        hasBeenBroken: true,
      };
    }

    default:
      return state;
  }
};

export default reducer;
