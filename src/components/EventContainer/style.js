import { StyleSheet } from 'react-native';

const HORIZONTAL_MARGIN = 12;
export const styles = StyleSheet.create({
  eventContainer: {
    borderRadius: 10, // TODO: MAKE THIS CONFIGURABLE
    overflow: 'hidden',
  },
  cardContainer: {
    borderRadius: 10,
    marginBottom: 25,
    marginHorizontal: HORIZONTAL_MARGIN,
    shadowColor: '#DAD8D8',
    shadowOpacity: 1,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});
