import { Map } from 'immutable';
import {
    START_LOADING_TIMELINES,
    DONE_LOADING_TIMELINES,
} from '../actions';


const appInitialState = Map({
  loadingTimelines: false,
});

export default (state = appInitialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case START_LOADING_TIMELINES:
      return state.set('loadingTimelines', true);
        
    case DONE_LOADING_TIMELINES:
      return state.set('loadingTimelines', false);
    
    default:
      return state;
  }
};
