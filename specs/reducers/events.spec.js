import {
    fetchEvents,
    fetchEventsDone,
    fetchEventsFailed,
    fetchFavoriteTweetsDone,
} from '../../src/actions';
import appReducer from '../../src/reducers/events';

describe('events reducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = appReducer();
  });

  describe('fetchEvents is dispatched', () => {
    it('should set loading to true', () => {
      const newState = appReducer(initialState, fetchEvents());

      expect(newState.get('loading')).to.equal(true);
    });
  });

  describe('fetchEventsDone is dispatched', () => {
    it('should set loading to false', () => {
      const newState = appReducer(initialState, fetchEventsDone({ data: [], meta: {}, links: {} }));

      expect(newState.get('loading')).to.equal(false);
    });

    it('should set socialEvents', () => {
      const newState = appReducer(initialState, fetchEventsDone({ data: [1, 2], meta: {}, links: {} }));

      expect(newState.get('events')).to.deep.equal([1, 2]);
    });
  });

  describe('fetchFavoriteTweetsDone is dispatched', () => {
    it('should set favoriteTweets', () => {
      const newState = appReducer(initialState, fetchFavoriteTweetsDone([1, 2]));

      expect(newState.get('favoriteTweets')).to.deep.equal({ 1: '1', 2: '2' });
    });
  });

  describe('fetchEventsFailed is dispatched', () => {
    it('should set loading to false', () => {
      const newState = appReducer(initialState, fetchEventsFailed());

      expect(newState.get('loading')).to.equal(false);
    });
  });
});
