import { Map } from 'immutable';
import {
  FETCH_SOCIAL_EVENTS_START,
  FETCH_SOCIAL_EVENTS_DONE,
  FETCH_SOCIAL_EVENTS_FAILED,
  FETCH_FAVORITE_TWEETS_DONE,
} from '../actions';
import { actionCreator } from '../actions/actionHelpers';

const appInitialState = Map({
  loading: false,
  socialEvents: [],
  favoriteTweets: null,
});

export default (state = appInitialState, action = actionCreator()) => {
  const { type, payload } = action;
  
  switch (type) {
    case FETCH_SOCIAL_EVENTS_START:
      return state.set('loading', true);

    case FETCH_SOCIAL_EVENTS_FAILED:
      return state.set('loading', false);

    case FETCH_SOCIAL_EVENTS_DONE:
      const { data: events = [], meta, links } = payload;
      return state
        .set('loading', false)
        .set('socialEvents', events);

    case FETCH_FAVORITE_TWEETS_DONE:
      const favoriteTweets = payload || [];
      const favoriteTweetsById = favoriteTweets.reduce((obj, v) => {
        obj[v.toString()] = v.toString();
        return obj;
      }, {});
      
      return state.set('favoriteTweets', favoriteTweetsById);

    default:
      return state;
  }
};
