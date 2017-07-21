import { Map } from 'immutable';
import {
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
    case SET_ENVIRONMENT:
      return state.set('environment', payload.environment);

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
