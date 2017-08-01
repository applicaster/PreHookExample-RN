import { Map } from 'immutable';
import {
  FETCH_SOCIAL_EVENTS_START,
  FETCH_SOCIAL_EVENTS_DONE,
  FETCH_SOCIAL_EVENTS_FAILED,
} from '../actions';
import { actionCreator } from '../actions/actionHelpers';

const appInitialState = Map({
  loading: false,
  socialEvents: [],
});

export default (state = appInitialState, action = actionCreator()) => {
  const { type, payload } = action;
  
  switch (type) {
    case FETCH_SOCIAL_EVENTS_START:
      return state.set('loading', true);

    case FETCH_SOCIAL_EVENTS_FAILED:
      return state.set('loading', false);

    case FETCH_SOCIAL_EVENTS_DONE:
      return state
        .set('loading', false)
        .set('socialEvents', payload.events);

    default:
      return state;
  }
};
