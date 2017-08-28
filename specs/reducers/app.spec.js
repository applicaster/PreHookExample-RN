import {
    setEnvironment,
    setAccountId,
    setTimelineId,
    setTimezone,
    showMediaDetailsModal,
    hideMediaDetailsModal,
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

  describe('showMediaDetailsModal is dispatched', () => {
    it('should set isMediaModalVisible to true', () => {
      const newState = appReducer(initialState, showMediaDetailsModal());

      expect(newState.get('isMediaModalVisible')).to.equal(true);
    });
  });

  describe('hideMediaDetailsModal is dispatched', () => {
    it('should set isMediaModalVisible to false', () => {
      const newState = appReducer(initialState, hideMediaDetailsModal());

      expect(newState.get('isMediaModalVisible')).to.equal(false);
    });
  });
});
