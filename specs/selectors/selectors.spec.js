import configureMockStore from 'redux-mock-store';
import { Map } from 'immutable';
import {
  getAccountId,
  getTimelineId,
  getTimezone,
  getEnvironment,
  getSocialEvents,
  getLoading,
  getMediaModalVisibility,
  getActiveEventId,
  getActiveEvent,
} from '../../src/selectors';

const mockStore = configureMockStore();

describe('selectors', () => {
  let store;
  const someEvent = { foo: 'bar', id: 'someId' };
  beforeEach(() => {
    store = mockStore({
      app: Map({
        accountId: 'someAccountId',
        timelineId: 'someTimelineId',
        timezone: 'someTimezone',
        environment: 'someEnvironment',
        isMediaModalVisible: true,
        activeEventId: 'someId',
      }),
      events: Map({
        socialEvents: [someEvent, 2],
        loading: false,
      }),
    });
  });

  describe('getAccountid', () => {
    it('should get the account id from the app state', () => {
      expect(getAccountId(store.getState())).to.equal('someAccountId');
    });
  });

  describe('getTimelineId', () => {
    it('should get the timeline id from the app state', () => {
      expect(getTimelineId(store.getState())).to.equal('someTimelineId');
    });
  });

  describe('getTimezone', () => {
    it('should get the account id from the app state', () => {
      expect(getTimezone(store.getState())).to.equal('someTimezone');
    });
  });

  describe('getEnvironment', () => {
    it('should get the account id from the app state', () => {
      expect(getEnvironment(store.getState())).to.equal('someEnvironment');
    });
  });

  describe('getSocialEvents', () => {
    it('should get the socialEvents from the events reducer state', () => {
      expect(getSocialEvents(store.getState())).to.deep.equal([someEvent, 2]);
    });
  });

  describe('loading', () => {
    it('should get loading property from the events reducer state', () => {
      expect(getLoading(store.getState())).to.equal(false);
    });
  });

  describe('getMediaModalVisibility', () => {
    it('should get isMediaModalVisible property from the app reducer state', () => {
      expect(getMediaModalVisibility(store.getState())).to.equal(true);
    });
  });

  describe('getActiveEventId', () => {
    it('should get activeEventId property from the app reducer state', () => {
      expect(getActiveEventId(store.getState())).to.equal('someId');
    });
  });

  describe('getActiveEvent', () => {
    it('should get the event for the activeEventId property from the events reducer state', () => {
      expect(getActiveEvent(store.getState())).to.deep.equal(someEvent);
    });
  });
});
