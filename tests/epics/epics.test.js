import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import 'rxjs/add/operator/toArray';
import { createEpicMiddleware, ActionsObservable } from 'redux-observable';
import { Map } from 'immutable';
import sinon from 'sinon';
import {
  fetchSocialEventsEpic,
  setSocialMetadataEpic,
  fetchFavoriteTweetsEpic,
  updateFavoriteTweetsEpic,
} from '../../src/epics';
import {
  FETCH_SOCIAL_EVENTS_START,
  FETCH_SOCIAL_EVENTS_DONE,
  FETCH_SOCIAL_EVENTS_FAILED,
  FETCH_FAVORITE_TWEETS_DONE,
  SET_SOCIAL_METADATA,
  UPDATE_FAVORITE_TWEETS,
} from '../../src/actions';

jest.mock('@applicaster/feed-rn-utils', () => ({
  getFavoriteTweets: () => Promise.resolve([1, 2]),
}));

const epicMiddleware = createEpicMiddleware(fetchSocialEventsEpic);
const mockStore = configureMockStore([epicMiddleware]);

describe('fetchSocialEventsEpic', () => {
  let axiosGetStub;
  let store;
  let action$;
  beforeEach(() => {
    axiosGetStub = sinon.stub(axios, 'get').resolves({ data: { data: [1, 2], meta: {}, links: {} } });
    store = mockStore({ app: Map({}) });
    action$ = ActionsObservable.of({ type: FETCH_SOCIAL_EVENTS_START });
  });
  
  afterEach(() => axios.get.restore());

  test('dispatches the correct actions with expected payloads', done => {
    const expectedOutputActions = [{
      type: FETCH_SOCIAL_EVENTS_DONE,
      meta: undefined,
      payload: { data: [1, 2], meta: {}, links: {} },
    }];

    fetchSocialEventsEpic(action$, store)
      .toArray()
      .subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions);
        done();
      }
    );
  });

  describe('and get request fails', () => {
    beforeEach(() => {
      axiosGetStub.rejects({ foo: 'bar' });
    });

    test('dispatches the correct actions with expected payload', done => {
      const expectedOutputActions = [{
        type: FETCH_SOCIAL_EVENTS_FAILED,
        meta: undefined,
        payload: { error: { foo: 'bar' } },
      }];

      fetchSocialEventsEpic(action$, store)
        .toArray()
        .subscribe(actualOutputActions => {
          expect(actualOutputActions).toEqual(expectedOutputActions);
          done();
        }
      );
    });
  });
});

describe('setSocialMetadataEpic', () => {
  let action$;
  beforeEach(() => {
    action$ = ActionsObservable.of({
      type: FETCH_SOCIAL_EVENTS_DONE,
      payload: { metadata: { facebookPageId: 'someId', twitterScreenName: 'screenName' } },
    });
  });

  test('dispatches the correct actions with expected payloads', done => {
    const expectedOutputActions = [{
      type: SET_SOCIAL_METADATA,
      meta: undefined,
      payload: { facebookPageId: 'someId', twitterScreenName: 'screenName' },
    }];

    setSocialMetadataEpic(action$)
      .toArray()
      .subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions);
        done();
      }
    );
  });
});

describe('fetchFavoriteTweetsEpic', () => {
  let store;
  let action$;
  beforeEach(() => {
    action$ = ActionsObservable.of({ type:
      FETCH_SOCIAL_EVENTS_DONE,
      payload: { metadata: { facebookPageId: 'someId', twitterScreenName: 'screenName' } },
    });
  });

  test('dispatches the correct actions with expected payloads', done => {
    const expectedOutputActions = [{
      type: FETCH_FAVORITE_TWEETS_DONE,
      meta: undefined,
      payload: [1, 2],
    }];

    fetchFavoriteTweetsEpic(action$, store)
      .toArray()
      .subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions);
        done();
      }
    );
  });
});

describe('updateFavoriteTweetsEpic', () => {
  let store;
  let action$;
  beforeEach(() => {
    action$ = ActionsObservable.of({ type: UPDATE_FAVORITE_TWEETS });
  });

  test('dispatches the correct actions with expected payloads', done => {
    const expectedOutputActions = [{
      type: FETCH_FAVORITE_TWEETS_DONE,
      meta: undefined,
      payload: [1, 2],
    }];

    updateFavoriteTweetsEpic(action$, store)
      .toArray()
      .subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions);
        done();
      }
    );
  });
});
