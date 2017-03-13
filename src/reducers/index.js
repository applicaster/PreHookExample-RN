import { combineReducers } from 'redux';

import app from './app';
import events from './events';
import settings from './settings';

const rootReducer = combineReducers({
  app,
  settings,
  events,
});

export default rootReducer;
