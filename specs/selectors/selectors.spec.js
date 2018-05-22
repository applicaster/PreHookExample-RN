import configureMockStore from 'redux-mock-store';
import { Map } from 'immutable';
import {
  getAccountId,
  getTimelineId,
  getTimezone,
  getEnvironment,
  getEvents,
  getEntries,
  getEventsLoading,
  getActiveEventId,
  getActiveEvent,
  getEventIdForActiveAudio,
  getFacebookPageId,
  getTwitterScreenName,
  getModalVisibility,
  getActiveModalName,
  isFacebookAvailable,
  isTwitterAvailable,
  getActiveEventOriginUrl,
  getFavoriteTweets,
  getTranslations,
  getPublicPageUrl,
  getDataSourceProviderUrl,
  isLoading,
  getSortedCardsByDate,
  getCards,
  getViewableItems,
  getPlatform,
} from '../../src/selectors';

const mockStore = configureMockStore();

describe('selectors', () => {
  let store;
  const event1 = { foo: 'bar', id: '1', originUrl: 'someOriginUrl1', createdAt: 2 };
  const event2 = { foo: 'bar', id: '2', originUrl: 'someOriginUrl2', createdAt: 4 };
  const entry1 = { foo: 'bar', id: '3', originUrl: 'someOriginUrl3', createdAt: 1 };
  const entry2 = { foo: 'bar', id: '4', originUrl: 'someOriginUrl4', createdAt: 3 };
  beforeEach(() => {
    store = mockStore({
      app: Map({
        accountId: 'someAccountId',
        timelineId: 'someTimelineId',
        timezone: 'someTimezone',
        environment: 'someEnvironment',
        activeEventId: '1',
        activeModalName: 'someModalName',
        isModalVisible: true,
        eventIdForActiveAudio: 'someId',
        facebookPageId: 'someFacebookPageId',
        twitterScreenName: 'someTwitterScreenName',
        publicPageUrl: 'somePublicPageUrl',
        viewableItems: { 1: {} },
        platform: 'android',
      }),
      events: Map({
        events: { 1: event1, 2: event2 },
        loading: false,
        favoriteTweets: { 1: 1, 2: 2 },
      }),
      zappPipes: Map({
        dataSourceProviderUrl: 'someDataSourceProviderUrl',
        entries: { 3: entry1, 4: entry2 },
        loading: false,
      }),
      translations: {
        foo: 'bar',
      },
    });
  });

  describe('getAccountid', () => {
    it('should get the account id from the app state', () => {
      expect(getAccountId(store.getState())).to.equal('someAccountId');
    });
  });

  describe('getDataSourceProviderUrl', () => {
    it('should get the data source provider url from zappPipes state', () => {
      expect(getDataSourceProviderUrl(store.getState())).to.equal('someDataSourceProviderUrl');
    });
  });

  describe('getEntries', () => {
    it('should get the entries from the zappPipes reducer state', () => {
      expect(getEntries(store.getState())).to.deep.equal({ 3: entry1, 4: entry2 });
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

  describe('getEvents', () => {
    it('should get the events from the events reducer state', () => {
      expect(getEvents(store.getState())).to.deep.equal({ 1: event1, 2: event2 });
    });
  });

  describe('loading', () => {
    it('should get loading property from the events reducer state', () => {
      expect(getEventsLoading(store.getState())).to.equal(false);
    });
  });

  describe('getModalVisibility', () => {
    it('should get isModalVisible property from the app reducer state', () => {
      expect(getModalVisibility(store.getState())).to.equal(true);
    });
  });

  describe('getActiveModalName', () => {
    it('should get activeModalName property from the app reducer state', () => {
      expect(getActiveModalName(store.getState())).to.equal('someModalName');
    });
  });

  describe('getActiveEventId', () => {
    it('should get activeEventId property from the app reducer state', () => {
      expect(getActiveEventId(store.getState())).to.equal('1');
    });
  });

  describe('getActiveEvent', () => {
    it('should get the event for the activeEventId property from the events reducer state', () => {
      expect(getActiveEvent(store.getState())).to.deep.equal(event1);
    });
  });

  describe('getPublicPageUrl', () => {
    it('should get the publicPageUrl property from the app reducer state', () => {
      expect(getPublicPageUrl(store.getState())).to.deep.equal('somePublicPageUrl');
    });
  });

  describe('getActiveEventOriginUrl', () => {
    it('should get the originUrl for the activeEvent from the events reducer state', () => {
      expect(getActiveEventOriginUrl(store.getState())).to.deep.equal('someOriginUrl1');
    });
  });

  describe('getEventIdForActiveAudio', () => {
    it('should get the eventId for the video playing audio from the app reducer state', () => {
      expect(getEventIdForActiveAudio(store.getState())).to.deep.equal('someId');
    });
  });

  describe('getFacebookPageId', () => {
    it('should get the facebookPageId from the app reducer state', () => {
      expect(getFacebookPageId(store.getState())).to.equal('someFacebookPageId');
    });
  });

  describe('getTwitterScreenName', () => {
    it('should get the twitterScreenName from the app reducer state', () => {
      expect(getTwitterScreenName(store.getState())).to.equal('someTwitterScreenName');
    });
  });

  describe('isFacebookAvailable', () => {
    it('should get boolean for facebook availability from the app reducer state', () => {
      expect(isFacebookAvailable(store.getState())).to.equal(true);
    });
  });

  describe('isTwitterAvailable', () => {
    it('should get boolean for twitter availability from the app reducer state', () => {
      expect(isTwitterAvailable(store.getState())).to.equal(true);
    });
  });

  describe('getFavoriteTweets', () => {
    it('should get favoriteTweets from event reducer state', () => {
      expect(getFavoriteTweets(store.getState())).to.deep.equal({ 1: 1, 2: 2 });
    });
  });

  describe('getTranslations', () => {
    it('should get the translations state', () => {
      expect(getTranslations(store.getState())).to.deep.equal({ foo: 'bar' });
    });
  });

  describe('isLoading', () => {
    it('should get the composed state of loaders to determine if a reducers data is loading', () => {
      expect(isLoading(store.getState())).to.equal(false);
    });
  });

  describe('getCards', () => {
    it('should get an object of entries and events combined into one', () => {
      expect(getCards(store.getState())).to.deep.equal({
        1: event1,
        2: event2,
        3: entry1,
        4: entry2,
      });
    });
  });

  describe('getSortedCardsByDate', () => {
    it('should get a list of cards sorted by descending date', () => {
      expect(getSortedCardsByDate(store.getState())).to.deep.equal([
        event2,
        entry2,
        event1,
        entry1,
      ]);
    });
  });

  describe('getViewableItems', () => {
    it('should get the the viewableItems', () => {
      expect(getViewableItems(store.getState())).to.deep.equal({ 1: {} });
    });
  });

  describe('getPlatform', () => {
    it('should get the the platform from the app reducer', () => {
      expect(getPlatform(store.getState())).to.equal('android');
    });
  });
});
