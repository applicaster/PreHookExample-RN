import {
    setEnvironment,
    setAccountId,
    setTimelineId,
    setTimezone,
    toggleModal,
    setEventIdForActiveAudio,
    setActiveEventId,
    setNoActiveEvent,
    setMetadata,
    setViewableItems,
} from '../../src/actions';
import appReducer from '../../src/reducers/app';

describe('app reducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = appReducer();
  });

  describe('initial state', () => {
    it('reducer should have correct initial state', () => {
      const newState = appReducer();

      expect(newState.toJS()).to.deep.equal({
        environment: 'production',
        accountId: null,
        timelineId: null,
        timezone: 3600,
        isModalVisible: false,
        activeModalName: null,
        activeEventId: null,
        eventIdForActiveAudio: null,
        facebookPageId: null,
        twitterScreenName: null,
        publicPageUrl: null,
        navigationStyle: 'fullScreen',
        viewableItems: {},
        platform: null,
        isSocialPostingEnabled: true,
      });
    });
  });

  describe('setEnvironment is dispatched', () => {
    it('should set the environment', () => {
      const newState = appReducer(initialState, setEnvironment('production'));

      expect(newState.get('environment')).to.equal('production');
    });
  });

  describe('setAccountId is dispatched', () => {
    it('should set the accoundId', () => {
      const newState = appReducer(initialState, setAccountId('someId'));

      expect(newState.get('accountId')).to.equal('someId');
    });
  });

  describe('setTimelineId is dispatched', () => {
    it('should set the timelineId', () => {
      const newState = appReducer(initialState, setTimelineId('someId'));

      expect(newState.get('timelineId')).to.equal('someId');
    });
  });

  describe('setTimezone is dispatched', () => {
    it('should set the timezone', () => {
      const newState = appReducer(initialState, setTimezone('someZone'));

      expect(newState.get('timezone')).to.equal('someZone');
    });
  });

  describe('setEventIdForActiveAudio is dispatched', () => {
    it('should set the eventIdForActiveAudio', () => {
      const newState = appReducer(initialState, setEventIdForActiveAudio('someId'));

      expect(newState.get('eventIdForActiveAudio')).to.equal('someId');
    });
  });

  describe('toggleModal is dispatched', () => {
    it('should set isModalVisible to true when it is false', () => {
      const newState = appReducer(initialState, toggleModal({ modal: 'someModalName' }));

      expect(newState.get('isModalVisible')).to.equal(true);
    });

    it('should set isModalVisible to false when it is true', () => {
      const visibleModalState = initialState.set('isModalVisible', true);
      const newState = appReducer(visibleModalState, toggleModal({ modal: 'someModalName' }));
      
      expect(newState.get('isModalVisible')).to.equal(false);
    });

    it('should set activeModalName to the modal name passed', () => {
      const newState = appReducer(initialState, toggleModal({ modal: 'someModalName' }));

      expect(newState.get('activeModalName')).to.equal('someModalName');
    });
  });

  describe('setActiveEventId is dispatched', () => {
    it('should set the activeEventId', () => {
      const newState = appReducer(initialState, setActiveEventId('someId'));

      expect(newState.get('activeEventId')).to.equal('someId');
    });
  });

  describe('setNoActiveEvent is dispatched', () => {
    it('should set the activeEventId to undefined', () => {
      const newState = appReducer(initialState, setNoActiveEvent());

      expect(newState.get('activeEventId')).to.equal(null);
    });
  });

  describe('setMetadata is dispatched', () => {
    it('should set the facebookPageId', () => {
      const newState = appReducer(initialState, setMetadata({ facebookPageId: 'someId' }));

      expect(newState.get('facebookPageId')).to.equal('someId');
    });

    it('should set the twitterScreenName', () => {
      const newState = appReducer(initialState, setMetadata({ twitterScreenName: 'someScreenName' }));

      expect(newState.get('twitterScreenName')).to.equal('someScreenName');
    });
  });

  describe('setViewableItems is dispatched', () => {
    it('should set the viewableItems', () => {
      const newState = appReducer(initialState, setViewableItems([{ item: { id: 1 } }]));

      expect(newState.get('viewableItems')).to.deep.equal({
        1: { id: 1 },
      });
    });
  });
});
