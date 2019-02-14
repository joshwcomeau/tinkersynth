import { createStore, applyMiddleware, compose } from 'redux';
import { save, load } from 'redux-localstorage-simple';

import rootReducer from '../reducers';
import createFocusManagerMiddleware from '../middlewares/focus-manager.middleware';
import DevTools from '../components/DevTools';

import { reduxLocalStorageConfig } from './redux-config';

const focusManagerMiddleware = createFocusManagerMiddleware();

export default function configureStore() {
  const store = createStore(
    rootReducer,
    load(reduxLocalStorageConfig),
    compose(
      applyMiddleware(focusManagerMiddleware, save(reduxLocalStorageConfig)),
      DevTools.instrument()
    )
  );

  // Allow direct access to the store, for debugging/testing
  window.store = store;

  return store;
}
