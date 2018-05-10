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
import { ZappPipesService } from 'react-native-zapp-bridge';
import { fetchEvents } from '../api/events';

import {
  getAccountId,
  getTimelineId,
  getEnvironment,
  getDataSourceProviderUrl,
} from '../selectors';

import {
  // ACTION NAMES:
  FETCH_EVENTS_START,
  FETCH_EVENTS_DONE,
  UPDATE_FAVORITE_TWEETS,
  FETCH_ZAPP_PIPES_START,

  // ACTION CREATORS:
  fetchEventsDone,
  fetchEventsFailed,
  fetchZappPipesDone,
  fetchZappPipesFailed,
  setMetadata,
  fetchFavoriteTweetsDone,
  fetchFavoriteTweetsFailed,
} from '../actions';

export const fetchZappPipesData = (action$, store) =>
  action$
    .filter(action => action.type === FETCH_ZAPP_PIPES_START)
    .mergeMap(() =>
      Observable.fromPromise(ZappPipesService.getDataSourceData(getDataSourceProviderUrl(store.getState())))
        .map(pipesData => fetchZappPipesDone(pipesData))
        .catch(error => Observable.of(fetchZappPipesFailed(error)))
    );

export const fetchEventsEpic = (action$, store) =>
  action$
    .filter(action => action.type === FETCH_EVENTS_START)
    .mergeMap(() =>
      Observable.fromPromise(fetchEvents({
        environment: getEnvironment(store.getState()),
        accountId: getAccountId(store.getState()),
        timelineId: getTimelineId(store.getState()),
      }))
        .map(response => fetchEventsDone(response.data))
        .catch(error => Observable.of(fetchEventsFailed(error)))
    );
  
export const setMetadataEpic = (action$) =>
    action$
      .filter(action => action.type === FETCH_EVENTS_DONE)
      .map(action => setMetadata(action.payload.metadata));

export const fetchFavoriteTweetsEpic = (action$) =>
    action$
      .filter(action => action.type === FETCH_EVENTS_DONE)
      .mergeMap(action => {
        const { metadata } = action.payload;
        if (metadata && metadata.twitterScreenName) {
          return Observable.fromPromise(FeedRNUtils.getFavoriteTweets())
            .map(favoriteTweetIds => fetchFavoriteTweetsDone(favoriteTweetIds))
            .catch(error => Observable.of(fetchFavoriteTweetsFailed(error)));
        }
        
        return Observable.empty();
      });

export const updateFavoriteTweetsEpic = (action$) =>
  action$
    .filter(action => action.type === UPDATE_FAVORITE_TWEETS)
    .mergeMap(() => Observable.fromPromise(FeedRNUtils.getFavoriteTweets())
      .map(favoriteTweetIds => fetchFavoriteTweetsDone(favoriteTweetIds))
      .catch(error => Observable.of(fetchFavoriteTweetsFailed(error))));

export default combineEpics(
  fetchEventsEpic,
  fetchZappPipesData,
  setMetadataEpic,
  fetchFavoriteTweetsEpic,
  updateFavoriteTweetsEpic,
);
