import { Map } from 'immutable';
import {
    SET_ENVIRONMENT,
    SET_ACCOUNT_ID,
    SET_TIMELINE_ID,
    SET_TIMEZONE,
    TOGGLE_MODAL,
} from '../actions';
import { actionCreator } from '../actions/actionHelpers';

const appInitialState = Map({
  environment: null,
  accountId: null,
  timelineId: null,
  timezone: null,
  isMediaModalVisible: false,
  activeEventId: null,
});

export default (state = appInitialState, action = actionCreator()) => {
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

    case TOGGLE_MODAL:
      return state
        .set('isMediaModalVisible', !state.get('isMediaModalVisible'))
        .set('activeEventId', payload.activeEventId || null);

    default:
      return state;
  }
};
