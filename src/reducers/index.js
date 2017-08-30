import { combineReducers } from 'redux';

import app from './app';
import activeEvent from './activeEvent';
import events from './events';
import settings from './settings';
import navigation from './navigation';

const rootReducer = combineReducers({
  app,
  activeEvent,
  settings,
  events,
  navigation,
});

export default rootReducer;
