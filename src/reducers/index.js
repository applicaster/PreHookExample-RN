import { combineReducers } from 'redux';

import app from './app';
import events from './events';
import translations from './translations';
import navigation from './navigation';
import zappPipes from './zappPipes';

const rootReducer = combineReducers({
  app,
  translations,
  events,
  navigation,
  zappPipes,
});

export default rootReducer;
