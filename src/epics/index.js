import { Observable } from 'rxjs/Observable';
import { starsInit } from 'applicaster-stars';
import { combineEpics } from 'redux-observable';

import {
  getAccountId,
  getStarsServiceState,
  getTimelineId,
  getTimezone,
} from '../selectors';

import {
    FETCH_EVENTS_START,
    FETCH_EVENT_SOURCES_START,
    INIT_STARS_SERVICES,
    starsServicesLoaded,
    fetchEventsDone,
    fetchEventsFailed,
    fetchEventSourcesDone,
    fetchEventSourcesFailed,
    errorOccured,
} from '../actions';

let stars;
let stars$;

const fetchEventSourcesEpic = (action$) =>
  action$
    .ofType(FETCH_EVENT_SOURCES_START)
    .mergeMap(() =>
        Observable.fromPromise(stars.fetchEventSources())
          .map(response => fetchEventSourcesDone(response))
          .catch(error => fetchEventSourcesFailed(error))
        );

const fetchEventsEpic = (action$) =>
  action$
    .ofType(FETCH_EVENTS_START)
    .mergeMap(() =>
        Observable.fromPromise(stars.fetchEvents())
          .map(response => fetchEventsDone(response))
          .catch(error => fetchEventsFailed(error))
        );


const loadStarsServicesEpic = (action$, store) =>
  action$
      .ofType(INIT_STARS_SERVICES)
      .pluck('payload')
      .take(1)
      .map(() => {
        const accountId = getAccountId(store.getState());
        const timelineId = getTimelineId(store.getState());
        const timezone = getTimezone(store.getState());

        let isStarsServiceActive = getStarsServiceState(store.getState());

        if (!isStarsServiceActive) {
          if (timelineId) {
            stars = starsInit({
              clientId: accountId,
              timelineId,
              timezone,
              startTime: 0,
            });
            debugger;
            stars$ = stars.createPollingObservable({ pollRate: 5000 });

            isStarsServiceActive = true;
          }
        }

        return starsServicesLoaded();
      })
      .catch(errorOccured());

export default combineEpics(
  loadStarsServicesEpic,
  fetchEventsEpic,
  fetchEventSourcesEpic,
);
