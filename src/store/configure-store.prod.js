import { createStore } from 'redux';

import rootReducer from '../reducers';

export default function configureStore() {
  const store = createStore(rootReducer);

  return store;
}
