const initialState = {
  hasBeenBroken: false,
  isAwareOfPurchaseOptions: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DISCOVER_STOREFRONT': {
      return {
        ...state,
        isAwareOfPurchaseOptions: true,
      };
    }

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
