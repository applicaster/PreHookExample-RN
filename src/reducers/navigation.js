import { StackNavigator } from 'react-navigation';
import navigationRoutes from '../navigationRoutes';

const Navigator = StackNavigator(navigationRoutes);
const initialState = Navigator.router.getStateForAction(Navigator.router.getActionForPathAndParams('Feed'));

export default (state = initialState, action) => {
  const nextState = Navigator.router.getStateForAction(action, state);
  return nextState || state;
};
