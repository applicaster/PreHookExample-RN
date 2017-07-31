import { Map } from 'immutable';
import {
  FETCH_SOCIAL_EVENTS_START,
  FETCH_SOCIAL_EVENTS_DONE,
  FETCH_SOCIAL_EVENTS_FAILED,
} from '../actions';
import { actionCreator } from '../actions/actionHelpers';

const appInitialState = Map({
  loading: false,
  socialPosts: [],
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
        .set('socialPosts', payload.events);

    default:
      return state;
  }
};
