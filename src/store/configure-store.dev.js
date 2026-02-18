import { createStore, applyMiddleware, compose } from 'redux';
import { save, load } from 'redux-localstorage-simple';

import rootReducer from '../reducers';
import createFocusManagerMiddleware from '../middlewares/focus-manager.middleware';

import { reduxLocalStorageConfig } from './redux-config';

const focusManagerMiddleware = createFocusManagerMiddleware();

const devToolsEnhancer =
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (f) => f;

export default function configureStore() {
  const store = createStore(
    rootReducer,
    load(reduxLocalStorageConfig),
    compose(
      applyMiddleware(focusManagerMiddleware, save(reduxLocalStorageConfig)),
      devToolsEnhancer
    )
  );

  // Allow direct access to the store, for debugging/testing
  window.store = store;

  return store;
}
