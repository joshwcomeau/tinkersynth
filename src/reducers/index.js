import { combineReducers } from 'redux';

import toasts from './toasts.reducer.js';
import machine from './machine.reducer.js';
import store from './store.reducer.js';

export default combineReducers({ toasts, machine, store });
