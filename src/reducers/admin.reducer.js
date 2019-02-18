/**
 * This reducer is only used for admin pages. Shouldn't hold anything that
 * is publicly viewable.
 */
const initialState = {
  password: null,
};

export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case 'AUTHENTICATE_AS_ADMIN': {
      return {
        ...state,
        password: action.password,
      };
    }

    default:
      return state;
  }
}
