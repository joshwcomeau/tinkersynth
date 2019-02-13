import { createStore, applyMiddleware, compose } from 'redux';
import { save, load } from 'redux-localstorage-simple';

import rootReducer from '../reducers';
import createFocusManagerMiddleware from '../middlewares/focus-manager.middleware';
import DevTools from '../components/DevTools';

const focusManagerMiddleware = createFocusManagerMiddleware();

export default function configureStore() {
  const store = createStore(
    rootReducer,
    load(),
    compose(
      applyMiddleware(
        focusManagerMiddleware,
        save(['toasts', 'machine', 'store'], 'tinkersynth-redux-state')
      ),
      DevTools.instrument()
    )
  );

  // Allow direct access to the store, for debugging/testing
  window.store = store;

  return store;
}
