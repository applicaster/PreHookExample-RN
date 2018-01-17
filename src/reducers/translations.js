import { actionCreator } from '../actions/actionHelpers';

export default (state = {}, action = actionCreator()) => {
  const { type, payload } = action;
  
  switch (type) {
    default:
      return state;
  }
};
