import { Map } from 'immutable';
import {
    SET_ENVIRONMENT,
    SET_ACCOUNT_ID,
    SET_TIMELINE_ID,
    SET_TIMEZONE,
    TOGGLE_MODAL,
    SET_EVENT_ID_FOR_ACTIVE_AUDIO,
    SET_ACTIVE_EVENT_ID,
    SET_METADATA,
    SET_VIEWABLE_ITEMS,
    SET_NO_ACTIVE_EVENT,
} from '../actions';
import { actionCreator } from '../actions/actionHelpers';

export const appInitialState = Map({
  environment: 'production',
  accountId: null,
  timelineId: null,
  timezone: 3600,
  isModalVisible: false,
  activeModalName: null,
  activeEventId: null,
  viewableItems: {},
  eventIdForActiveAudio: null,
  facebookPageId: null,
  twitterScreenName: null,
  publicPageUrl: null,
  platform: null,
  navigationStyle: 'fullScreen',
});

export default (state = appInitialState, action = actionCreator()) => {
  const { type, payload = {} } = action;

  switch (type) {
    case SET_ENVIRONMENT:
      return state.set('environment', payload.environment);

    case SET_ACCOUNT_ID:
      return state.set('accountId', payload.accountId);
    
    case SET_TIMELINE_ID:
      return state.set('timelineId', payload.timelineId);

    case SET_TIMEZONE:
      return state.set('timezone', payload.timezone);

    case SET_METADATA:
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
    
    case SET_NO_ACTIVE_EVENT:
      return state.set('activeEventId', null);
    
    case SET_EVENT_ID_FOR_ACTIVE_AUDIO:
      return state.set('eventIdForActiveAudio', payload.eventId);

    case SET_VIEWABLE_ITEMS:
      const { viewableItems } = payload;
      const viewableItemsById = {};
      viewableItems.forEach(viewableItem => {
        viewableItemsById[viewableItem.item.id] = viewableItem.item;
      });
      return state.set('viewableItems', viewableItemsById);

    default:
      return state;
  }
};
