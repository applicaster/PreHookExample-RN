import {
    fetchSocialEvents,
    fetchSocialEventsDone,
    fetchSocialEventsFailed,
    fetchFavoriteTweetsDone,
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
      const newState = appReducer(initialState, fetchSocialEventsDone({ data: [], meta: {}, links: {} }));

      expect(newState.get('loading')).to.equal(false);
    });

    it('should set socialEvents', () => {
      const newState = appReducer(initialState, fetchSocialEventsDone({ data: [1, 2], meta: {}, links: {} }));

      expect(newState.get('socialEvents')).to.deep.equal([1, 2]);
    });
  });

  describe('fetchFavoriteTweetsDone is dispatched', () => {
    it('should set favoriteTweets', () => {
      const newState = appReducer(initialState, fetchFavoriteTweetsDone([1, 2]));

      expect(newState.get('favoriteTweets')).to.deep.equal({ 1: '1', 2: '2' });
    });
  });

  describe('fetchSocialEventsFailed is dispatched', () => {
    it('should set loading to false', () => {
      const newState = appReducer(initialState, fetchSocialEventsFailed());

      expect(newState.get('loading')).to.equal(false);
    });
  });
});
