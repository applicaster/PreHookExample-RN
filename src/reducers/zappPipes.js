import { Map } from 'immutable';
import {
  FETCH_ZAPP_PIPES_START,
  FETCH_ZAPP_PIPES_DONE,
  FETCH_ZAPP_PIPES_FAILED,
} from '../actions';
import { actionCreator } from '../actions/actionHelpers';

export const zappPipesInitialState = Map({
  loading: false,
  dataSourceProviderUrl: '',
  entries: {},
});

export default (state = zappPipesInitialState, action = actionCreator()) => {
  const { type, payload = {} } = action;
  
  switch (type) {
    case FETCH_ZAPP_PIPES_START:
      return state.set('loading', true);

    case FETCH_ZAPP_PIPES_FAILED:
      return state.set('loading', false);

    case FETCH_ZAPP_PIPES_DONE:
      const entries = JSON.parse(payload);

      return state
        .set('loading', false)
        .set('entries', entries);

    default:
      return state;
  }
};
