import {
  toggleModal,
} from '../../src/actions';
import activeEventReducer from '../../src/reducers/activeEvent';

describe('activeEvent reducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = activeEventReducer();
  });

  describe('toggleModal is dispatched', () => {
    it('should set the imageUrl', () => {
      const actionParams = {
        imageUrl: 'someUrl',
      };

      const newState = activeEventReducer(initialState, toggleModal(actionParams));

      expect(newState.get('imageUrl')).to.equal('someUrl');
    });
  });
});
