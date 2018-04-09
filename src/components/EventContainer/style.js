import { StyleSheet } from 'react-native';
import { SCREEN_MARGIN } from '../../constants/measurements';

export const styles = StyleSheet.create({
  eventContainer: {
    borderRadius: 10, // TODO: MAKE THIS CONFIGURABLE
    overflow: 'hidden',
  },
  cardContainer: {
    borderRadius: 10,
    marginBottom: 25,
    marginHorizontal: SCREEN_MARGIN,
    shadowColor: '#DAD8D8',
    shadowOpacity: 1,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});
