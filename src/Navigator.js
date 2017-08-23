import { StackNavigator } from 'react-navigation';
import Feed from './components/Feed';

const AppRouteConfigs = {
  Feed: {
    screen: Feed,
  },
  Comments: {
    screen: Feed,
  },
};

export default StackNavigator(AppRouteConfigs);
