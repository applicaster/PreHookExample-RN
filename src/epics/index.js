import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import { combineEpics } from 'redux-observable';
import FeedRNUtils from '@applicaster/feed-rn-utils';
import { fetchSocialEvents } from '../api/social';

import {
  getAccountId,
  getTimelineId,
  getEnvironment,
} from '../selectors';

import {
  // ACTION NAMES:
  FETCH_SOCIAL_EVENTS_START,
  FETCH_SOCIAL_EVENTS_DONE,

  // ACTION CREATORS:
  fetchSocialEventsDone,
  fetchSocialEventsFailed,
  setSocialMetadata,
  fetchFavoriteTweetsDone,
  fetchFavoriteTweetsFailed,
} from '../actions';

export const fetchSocialEventsEpic = (action$, store) =>
  action$
    .filter(action => action.type === FETCH_SOCIAL_EVENTS_START)
    .mergeMap(() =>
      Observable.fromPromise(fetchSocialEvents({
        environment: getEnvironment(store.getState()),
        accountId: getAccountId(store.getState()),
        timelineId: getTimelineId(store.getState()),
      }))
        .map(response => fetchSocialEventsDone(response.data))
        .catch(error => Observable.of(fetchSocialEventsFailed(error)))
    );
  
export const setSocialMetadataEpic = (action$) =>
    action$
      .filter(action => action.type === FETCH_SOCIAL_EVENTS_DONE)
      .map(action => setSocialMetadata(action.payload.metadata));

export const fetchFavoriteTweets = (action$) =>
    action$
      .filter(action => action.type === FETCH_SOCIAL_EVENTS_DONE)
      .mergeMap(action => {
        const { metadata } = action.payload;
        if (metadata && metadata.twitterScreenName) {
          return Observable.fromPromise(FeedRNUtils.getFavoriteTweets())
            .map(favoriteTweetIds => fetchFavoriteTweetsDone(favoriteTweetIds))
            .catch(error => Observable.of(fetchFavoriteTweetsFailed(error)));
        }
        
        return Observable.empty();
      });

export default combineEpics(
  fetchSocialEventsEpic,
  setSocialMetadataEpic,
  fetchFavoriteTweets,
);
