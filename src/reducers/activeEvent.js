import { Map } from 'immutable';
import { TOGGLE_MODAL } from '../actions';
import { actionCreator } from '../actions/actionHelpers';

const activeEventInitialState = Map({
  caption: null,
  likesCount: 0,
  commetsCount: 0,
  imageUrl: null,
  imageWidth: null,
  imageHeight: null,
});

export default (state = activeEventInitialState, action = actionCreator()) => {
  const { type, payload } = action;

  switch (type) {
    case TOGGLE_MODAL:
      return state.set('imageUrl', payload.imageUrl || null);
      
    default:
      return state;
  }
};
