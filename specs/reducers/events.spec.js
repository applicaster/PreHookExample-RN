import {
    fetchSocialEvents,
    fetchSocialEventsDone,
    fetchSocialEventsFailed,
} from '../../src/actions';
import appReducer from '../../src/reducers/events';

describe('events reducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = appReducer();
  });

  describe('fetchSocialEvents is dispatched', () => {
    it('should set loading to true', () => {
      const newState = appReducer(initialState, fetchSocialEvents());

      expect(newState.get('loading')).to.equal(true);
    });
  });

  describe('fetchSocialEventsDone is dispatched', () => {
    it('should set loading to false', () => {
      const newState = appReducer(initialState, fetchSocialEventsDone());

      expect(newState.get('loading')).to.equal(false);
    });

    it('should set socialPosts', () => {
      const newState = appReducer(initialState, fetchSocialEventsDone([1, 2]));

      expect(newState.get('socialPosts')).to.deep.equal([1, 2]);
    });
  });

  describe('fetchSocialEventsFailed is dispatched', () => {
    it('should set loading to false', () => {
      const newState = appReducer(initialState, fetchSocialEventsFailed());

      expect(newState.get('loading')).to.equal(false);
    });
  });
});
