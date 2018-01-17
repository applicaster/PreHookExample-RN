import { combineReducers } from 'redux';

import app from './app';
import events from './events';
import translations from './translations';
import navigation from './navigation';

const rootReducer = combineReducers({
  app,
  translations,
  events,
  navigation,
});

export default rootReducer;
