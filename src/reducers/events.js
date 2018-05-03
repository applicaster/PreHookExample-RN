import { Map } from 'immutable';
import {
  FETCH_EVENTS_START,
  FETCH_EVENTS_DONE,
  FETCH_EVENTS_FAILED,
  FETCH_FAVORITE_TWEETS_DONE,
} from '../actions';
import { actionCreator } from '../actions/actionHelpers';

export const eventsInitialState = Map({
  loading: false,
  events: {},
  favoriteTweets: null,
});

export default (state = eventsInitialState, action = actionCreator()) => {
  const { type, payload = {} } = action;
  
  switch (type) {
    case FETCH_EVENTS_START:
      return state.set('loading', true);

    case FETCH_EVENTS_FAILED:
      return state.set('loading', false);

    case FETCH_EVENTS_DONE:
      const { data: eventsArray = [], meta, links } = payload;
      const events = {};
      eventsArray.forEach(event => {
        events[event.id] = event;
      });

      return state
        .set('loading', false)
        .set('events', events);

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
