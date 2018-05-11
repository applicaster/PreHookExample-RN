import axios from 'axios';
import { ZappPipesService } from 'react-native-zapp-bridge';
import configureMockStore from 'redux-mock-store';
import 'rxjs/add/operator/toArray';
import { createEpicMiddleware, ActionsObservable } from 'redux-observable';
import { Map } from 'immutable';
import sinon from 'sinon';
import {
  fetchEventsEpic,
  setMetadataEpic,
  fetchFavoriteTweetsEpic,
  updateFavoriteTweetsEpic,
  fetchZappPipesData,
} from '../../src/epics';
import {
  FETCH_EVENTS_START,
  FETCH_EVENTS_DONE,
  FETCH_EVENTS_FAILED,
  FETCH_ZAPP_PIPES_START,
  FETCH_ZAPP_PIPES_DONE,
  FETCH_ZAPP_PIPES_FAILED,
  FETCH_FAVORITE_TWEETS_DONE,
  SET_METADATA,
  UPDATE_FAVORITE_TWEETS,
} from '../../src/actions';


jest.mock('@applicaster/feed-rn-utils', () => ({
  getFavoriteTweets: () => Promise.resolve([1, 2]),
}));

const epicMiddleware = createEpicMiddleware(fetchEventsEpic);
const mockStore = configureMockStore([epicMiddleware]);

describe('fetchEventsEpic', () => {
  let axiosGetStub;
  let store;
  let action$;
  beforeEach(() => {
    axiosGetStub = sinon.stub(axios, 'get').resolves({ data: { data: [1, 2], meta: {}, links: {} } });
    store = mockStore({ app: Map({}) });
    action$ = ActionsObservable.of({ type: FETCH_EVENTS_START });
  });
  
  afterEach(() => axios.get.restore());

  test('dispatches the correct actions with expected payloads', done => {
    const expectedOutputActions = [{
      type: FETCH_EVENTS_DONE,
      meta: undefined,
      payload: { data: [1, 2], meta: {}, links: {} },
    }];

    fetchEventsEpic(action$, store)
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
        type: FETCH_EVENTS_FAILED,
        meta: undefined,
        payload: { error: { foo: 'bar' } },
      }];

      fetchEventsEpic(action$, store)
        .toArray()
        .subscribe(actualOutputActions => {
          expect(actualOutputActions).toEqual(expectedOutputActions);
          done();
        }
      );
    });
  });
});

describe('fetchZappPipesData', () => {
  let zappPipesGetStub;
  let store;
  let action$;
  beforeEach(() => {
    zappPipesGetStub = sinon.stub(ZappPipesService, 'getDataSourceData').resolves('{"title":"bar","entry":[]}');
    store = mockStore({ zappPipes: Map({ dataSourceProviderUrl: 'url' }) });
    action$ = ActionsObservable.of({ type: FETCH_ZAPP_PIPES_START });
  });
  
  afterEach(() => ZappPipesService.getDataSourceData.restore());

  test('dispatches the correct actions with expected payloads', done => {
    const expectedOutputActions = [{
      type: FETCH_ZAPP_PIPES_DONE,
      meta: undefined,
      payload: { title: 'bar', entries: { } },
    }];

    fetchZappPipesData(action$, store)
      .toArray()
      .subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions);
        done();
      }
    );
  });

  describe('and get request fails', () => {
    beforeEach(() => {
      zappPipesGetStub.rejects({ foo: 'bar' });
    });

    test('dispatches the correct actions with expected payload', done => {
      const expectedOutputActions = [{
        type: FETCH_ZAPP_PIPES_FAILED,
        meta: undefined,
        payload: { foo: 'bar' },
      }];

      fetchZappPipesData(action$, store)
        .toArray()
        .subscribe(actualOutputActions => {
          expect(actualOutputActions).toEqual(expectedOutputActions);
          done();
        }
      );
    });
  });
});

describe('setMetadataEpic', () => {
  let action$;
  beforeEach(() => {
    action$ = ActionsObservable.of({
      type: FETCH_EVENTS_DONE,
      payload: { metadata: { facebookPageId: 'someId', twitterScreenName: 'screenName' } },
    });
  });

  test('dispatches the correct actions with expected payloads', done => {
    const expectedOutputActions = [{
      type: SET_METADATA,
      meta: undefined,
      payload: { facebookPageId: 'someId', twitterScreenName: 'screenName' },
    }];

    setMetadataEpic(action$)
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
      FETCH_EVENTS_DONE,
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
