import { Map } from 'immutable';
import {
    SET_ENVIRONMENT,
    SET_ACCOUNT_ID,
    SET_TIMELINE_ID,
    SET_TIMEZONE,
    TOGGLE_MODAL,
    SET_EVENT_ID_FOR_ACTIVE_AUDIO,
    SET_ACTIVE_EVENT_ID,
} from '../actions';
import { actionCreator } from '../actions/actionHelpers';

const appInitialState = Map({
  environment: null,
  accountId: null,
  timelineId: null,
  timezone: null,
  isMediaModalVisible: false,
  activeEventId: null,
  eventIdForActiveAudio: null,
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
      return state.update('isMediaModalVisible', visibility => !visibility);

    case SET_ACTIVE_EVENT_ID:
      return state.set('activeEventId', payload.eventId);
    
    case SET_EVENT_ID_FOR_ACTIVE_AUDIO:
      return state.set('eventIdForActiveAudio', payload.eventId);

    default:
      return state;
  }
};
