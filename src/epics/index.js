import { Observable } from 'rxjs/Observable';
import { combineEpics } from 'redux-observable';
import { fetchSocialEvents } from '../api/social';

import {
  getAccountId,
  getTimelineId,
  getEnvironment,
} from '../selectors';

import {
  // ACTIONS:
  FETCH_SOCIAL_EVENTS_START,

  // ACTION CREATORS:
  fetchSocialEventsDone,
  fetchSocialEventsFailed,
} from '../actions';

const fetchSocialEventsEpic = (action$, store) =>
  action$
    .filter(action => action.type === FETCH_SOCIAL_EVENTS_START)
    .mergeMap(() =>
      Observable.fromPromise(fetchSocialEvents({
        environment: getEnvironment(store.getState()),
        accountId: getAccountId(store.getState()),
        timelineId: getTimelineId(store.getState()),
      }))
        .map(response => fetchSocialEventsDone(response.data))
        .catch(error => fetchSocialEventsFailed(error))
    );
  

export default combineEpics(
  fetchSocialEventsEpic,
);
