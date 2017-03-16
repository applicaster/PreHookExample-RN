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
    LOAD_RESOURCES,
    INIT_STARS_SERVICES,
    FETCH_EVENTS_START,
    FETCH_EVENT_SOURCES_START,
    
    initStarsServices,
    starsServicesLoaded,
    
    fetchEvents,
    fetchEventSources,
    fetchEventsDone,

    fetchEventsFailed,
    fetchEventSourcesDone,
    fetchEventSourcesFailed,
    errorOccured,
} from '../actions';

let stars;
let stars$;

const loadResourcesEpic = (action$) =>
  action$
    .ofType(LOAD_RESOURCES)
    .mapTo(initStarsServices());

const loadStarsServicesEpic = (action$, store) =>
  action$
      .ofType(INIT_STARS_SERVICES)
      .pluck('payload')
      .take(1)
      .flatMap(() => {
        const accountId = getAccountId(store.getState());
        const timelineId = getTimelineId(store.getState());
        const timezone = getTimezone(store.getState());
        let isStarsServiceActive = getStarsServiceState(store.getState());

        if (!isStarsServiceActive) {
          if (timelineId) {
            stars = starsInit({
              accountId,
              timelineId,
              timezone,
              startTime: 0,
            });
            
            stars$ = stars.createPollingObservable({ pollRate: 5000 });

            isStarsServiceActive = true;
          }
        }

        return Observable.of(starsServicesLoaded(), fetchEvents(), fetchEventSources());
      })
      .catch(errorOccured());

const fetchEventSourcesEpic = (action$) =>
  action$
    .ofType(FETCH_EVENT_SOURCES_START)
    .mergeMap(() =>
        Observable.fromPromise(stars.fetchFeeds())
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

export default combineEpics(
  loadResourcesEpic,
  loadStarsServicesEpic,
  fetchEventsEpic,
  fetchEventSourcesEpic,
);
