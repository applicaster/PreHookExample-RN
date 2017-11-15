import {
    setEnvironment,
    setAccountId,
    setTimelineId,
    setTimezone,
    toggleModal,
    setEventIdForActiveAudio,
    setActiveEventId,
} from '../../src/actions';
import appReducer from '../../src/reducers/app';

describe('app reducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = appReducer();
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
    it('should set isMediaModalVisible to true when it is false', () => {
      const newState = appReducer(initialState, toggleModal({ modal: 'MediaModal' }));

      expect(newState.get('isMediaModalVisible')).to.equal(true);
    });

    it('should set isMediaModalVisible to false when it is true', () => {
      const visibleModalState = initialState.set('isMediaModalVisible', true);
      const newState = appReducer(visibleModalState, toggleModal({ modal: 'MediaModal' }));
      
      expect(newState.get('isMediaModalVisible')).to.equal(false);
    });

    it('should set isWritePostModalVisible to true when it is false', () => {
      const newState = appReducer(initialState, toggleModal({ modal: 'WritePostModal' }));

      expect(newState.get('isWritePostModalVisible')).to.equal(true);
    });

    it('should set isWritePostModalVisible to false when it is true', () => {
      const visibleModalState = initialState.set('isWritePostModalVisible', true);
      const newState = appReducer(visibleModalState, toggleModal({ modal: 'WritePostModal' }));
      
      expect(newState.get('isWritePostModalVisible')).to.equal(false);
    });
  });

  describe('setActiveEventId is dispatched', () => {
    it('should set the activeEventId', () => {
      const newState = appReducer(initialState, setActiveEventId('someId'));

      expect(newState.get('activeEventId')).to.equal('someId');
    });
  });
});
