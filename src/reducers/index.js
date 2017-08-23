import { combineReducers } from 'redux';

import app from './app';
import events from './events';
import settings from './settings';
import navigation from './navigation';

const rootReducer = combineReducers({
  app,
  settings,
  events,
  navigation,
});

export default rootReducer;
