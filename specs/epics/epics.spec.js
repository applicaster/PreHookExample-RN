import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import 'rxjs/add/operator/toArray';
import { createEpicMiddleware, ActionsObservable } from 'redux-observable';
import { Map } from 'immutable';
import { fetchSocialEventsEpic } from '../../src/epics';
import {
  FETCH_SOCIAL_EVENTS_START,
  FETCH_SOCIAL_EVENTS_DONE,
  FETCH_SOCIAL_EVENTS_FAILED,
} from '../../src/actions';

const epicMiddleware = createEpicMiddleware(fetchSocialEventsEpic);
const mockStore = configureMockStore([epicMiddleware]);

describe('fetchSocialEventsEpic', () => {
  let axiosGetStub;
  let store;
  let action$;
  beforeEach(() => {
    axiosGetStub = sinon.stub(axios, 'get').resolves({ data: { data: [1,2], meta: {}, links: {} } });
    store = mockStore({ app: Map({}) });
    action$ = ActionsObservable.of({ type: FETCH_SOCIAL_EVENTS_START });
  });
  
  afterEach(() => axios.get.restore());

  it('dispatches the correct actions with expected payloads', done => {
    const expectedOutputActions = [{
      type: FETCH_SOCIAL_EVENTS_DONE,
      meta: undefined,
      payload: { data: [1,2], meta: {}, links: {} },
    }];

    fetchSocialEventsEpic(action$, store)
      .toArray()
      .subscribe(actualOutputActions => {
        expect(actualOutputActions).to.deep.equal(expectedOutputActions);
        done();
      }
    );
  });

  context('and get request fails', () => {
    beforeEach(() => {
      axiosGetStub.rejects({ foo: 'bar' });
    });

    it('dispatches the correct actions with expected payload', done => {
      const expectedOutputActions = [{
        type: FETCH_SOCIAL_EVENTS_FAILED,
        meta: undefined,
        payload: { error: { foo: 'bar' } },
      }];

      fetchSocialEventsEpic(action$, store)
        .toArray()
        .subscribe(actualOutputActions => {
          expect(actualOutputActions).to.deep.equal(expectedOutputActions);
          done();
        }
      );
    });
  });
});
