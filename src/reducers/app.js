import { Map } from 'immutable';
import {
    SET_ENVIRONMENT,
    SET_ACCOUNT_ID,
    SET_TIMELINE_ID,
    SET_TIMEZONE,
    TOGGLE_MODAL,
    SET_EVENT_ID_FOR_ACTIVE_AUDIO,
    SET_ACTIVE_EVENT_ID,
    SET_SOCIAL_METADATA,
} from '../actions';
import { actionCreator } from '../actions/actionHelpers';

export const appInitialState = Map({
  environment: null,
  accountId: null,
  timelineId: null,
  timezone: null,
  isModalVisible: false,
  activeModalName: null,
  activeEventId: null,
  eventIdForActiveAudio: null,
  facebookPageId: null,
  twitterScreenName: null,
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

    case SET_SOCIAL_METADATA:
      return state.withMutations(mutableState => {
        mutableState
          .set('facebookPageId', payload.facebookPageId)
          .set('twitterScreenName', payload.twitterScreenName);
      });

    case TOGGLE_MODAL:
      return state.withMutations(mutableState => {
        mutableState
          .update('isModalVisible', visibility => !visibility)
          .set('activeModalName', payload.modal);
      });

    case SET_ACTIVE_EVENT_ID:
      return state.set('activeEventId', payload.eventId);
    
    case SET_EVENT_ID_FOR_ACTIVE_AUDIO:
      return state.set('eventIdForActiveAudio', payload.eventId);

    default:
      return state;
  }
};
