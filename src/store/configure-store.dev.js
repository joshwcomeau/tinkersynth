import { createStore } from 'redux';

import rootReducer from '../reducers';
import DevTools from '../components/DevTools';

export default function configureStore() {
  const store = createStore(rootReducer, undefined, DevTools.instrument());

  // Allow direct access to the store, for debugging/testing
  window.store = store;

  return store;
}
