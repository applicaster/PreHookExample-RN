import {
  fetchZappPipes,
  fetchZappPipesDone,
  fetchZappPipesFailed,
} from '../../src/actions';
import appReducer from '../../src/reducers/zappPipes';

describe('zappPipes reducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = appReducer();
  });

  describe('initial state', () => {
    it('reducer should have correct initial state', () => {
      const newState = appReducer();

      expect(newState.toJS()).to.deep.equal({
        loading: false,
        dataSourceProviderUrl: '',
        entries: {},
        title: '',
      });
    });
  });

  describe('fetchZappPipes is dispatched', () => {
    it('should set loading to true', () => {
      const newState = appReducer(initialState, fetchZappPipes());

      expect(newState.get('loading')).to.equal(true);
    });
  });

  describe('fetchZappPipesDone is dispatched', () => {
    it('should set loading to false', () => {
      const newState = appReducer(initialState, fetchZappPipesDone({ entries: [1, 2] }));

      expect(newState.get('loading')).to.equal(false);
    });

    it('should set entries', () => {
      const newState = appReducer(initialState, fetchZappPipesDone({ entries: [1, 2] }));

      expect(newState.get('entries')).to.deep.equal([1, 2]);
    });

    it('should set title', () => {
      const newState = appReducer(initialState, fetchZappPipesDone({ entries: [1, 2], title: 'bar' }));

      expect(newState.get('title')).to.deep.equal('bar');
    });
  });

  describe('fetchZappPipesFailed is dispatched', () => {
    it('should set loading to false', () => {
      const newState = appReducer(initialState, fetchZappPipesFailed());

      expect(newState.get('loading')).to.equal(false);
    });
  });
});
