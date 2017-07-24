import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import { combineEpics } from 'redux-observable';
import { fetchSocialEvents } from '../api/social';

import {
  getAccountId,
  getTimelineId,
  getEnvironment,
} from '../selectors';

import {
  // ACTION NAMES:
  FETCH_SOCIAL_EVENTS_START,

  // ACTION CREATORS:
  fetchSocialEventsDone,
  fetchSocialEventsFailed,
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
  

export default combineEpics(
  fetchSocialEventsEpic,
);
