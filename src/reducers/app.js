import { Map } from 'immutable';
import {
    START_LOADING_TIMELINES,
    DONE_LOADING_TIMELINES,
    SET_ENVIRONMENT,
    SET_ACCOUNT_ID,
    SET_TIMELINE_ID,
    SET_TIMEZONE,
} from '../actions';


const appInitialState = Map({
  loadingTimelines: false,
  env: null,
  accountId: null,
  timelineId: null,
  timezone: null,
});

export default (state = appInitialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case START_LOADING_TIMELINES:
      return state.set('loadingTimelines', true);
        
    case DONE_LOADING_TIMELINES:
      return state.set('loadingTimelines', false);
    
    case SET_ENVIRONMENT:
      return state.set('env', payload.env);

    case SET_ACCOUNT_ID:
      return state.set('accountId', payload.accountId);
    
    case SET_TIMELINE_ID:
      return state.set('timelineId', payload.timelineId);

    case SET_TIMEZONE:
      return state.set('timezone', payload.timezone);

    default:
      return state;
  }
};
