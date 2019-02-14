import { createStore, applyMiddleware } from 'redux';
import { save, load } from 'redux-localstorage-simple';

import rootReducer from '../reducers';
import { reduxLocalStorageConfig } from './redux-config';

export default function configureStore() {
  const store = createStore(
    rootReducer,
    load(reduxLocalStorageConfig),
    applyMiddleware(save(reduxLocalStorageConfig))
  );

  return store;
}
