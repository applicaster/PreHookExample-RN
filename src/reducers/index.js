import { combineReducers } from 'redux';

import app from './app';
import events from './events';
import navigation from './navigation';
import translations from './translations';
import zappPipes from './zappPipes';

const rootReducer = combineReducers({
  app,
  events,
  navigation,
  translations,
  zappPipes,
});

export default rootReducer;
