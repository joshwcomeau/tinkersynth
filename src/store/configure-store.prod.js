import { createStore, applyMiddleware } from 'redux';
import { save, load } from 'redux-localstorage-simple';

import rootReducer from '../reducers';
import { reduxLocalStorageConfig } from './redux-config';

export default function configureStore() {
  // In SSR, we can't access localStorage, so we need to build the store without
  // save/load support. I think this is fine though.
  let store;

  if (typeof window === 'undefined') {
    store = createStore(rootReducer);
  } else {
    store = createStore(
      rootReducer,
      load(reduxLocalStorageConfig),
      applyMiddleware(save(reduxLocalStorageConfig))
    );
  }

  return store;
}
