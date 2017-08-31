import {
    setEnvironment,
    setAccountId,
    setTimelineId,
    setTimezone,
    toggleModal,
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

  describe('toggleModal is dispatched', () => {
    it('should set isMediaModalVisible to true when it is false', () => {
      const newState = appReducer(initialState, toggleModal({}));

      expect(newState.get('isMediaModalVisible')).to.equal(true);
    });

    it('should set isMediaModalVisible to false when it is true', () => {
      const visibleModalState = initialState.set('isMediaModalVisible', true);
      const newState = appReducer(visibleModalState, toggleModal({}));
      
      expect(newState.get('isMediaModalVisible')).to.equal(false);
    });

    it('should set activeEventId if present', () => {
      const visibleModalState = initialState.set('isMediaModalVisible', true);
      const newState = appReducer(visibleModalState, toggleModal({ activeEventId: 'someId' }));
      
      expect(newState.get('activeEventId')).to.equal('someId');
    });

    it('should set activeEventId to null if not present', () => {
      const visibleModalState = initialState.set('isMediaModalVisible', true);
      const newState = appReducer(visibleModalState, toggleModal({}));
      
      expect(newState.get('activeEventId')).to.equal(null);
    });
  });
});
