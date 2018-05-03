import Navigator from '../Navigator';

const initialState = Navigator.router.getStateForAction(Navigator.router.getActionForPathAndParams('Home'));

const getCurrentRouteName = (state) => {
  const route = state.routes[state.index];
  return typeof route.index === 'undefined' ? route.routeName : getCurrentRouteName(route);
};

export default (state = initialState, action) => {
  const nextState = Navigator.router.getStateForAction(action, state);

  // prevents navigating twice to the same route
  if (state && nextState) {
    const stateRouteName = getCurrentRouteName(state);
    const nextStateRouteName = getCurrentRouteName(nextState);
    return stateRouteName === nextStateRouteName ? state : nextState;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};
