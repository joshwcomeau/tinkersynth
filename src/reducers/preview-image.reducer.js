/**
 * This reducer holds the src for a purchased image, to be shown on the
 * 'thank you' page.
 */
const initialState = null;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'COMPLETE_PURCHASE': {
      return action.previewSrc;
    }

    default:
      return state;
  }
}
