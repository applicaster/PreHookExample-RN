import { StyleSheet } from 'react-native';
import { SCREEN_MARGIN } from '../../constants/measurements';

export const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    marginBottom: 25,
    marginHorizontal: SCREEN_MARGIN,
    shadowOpacity: 0.13,
    shadowColor: '#000000',
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});
