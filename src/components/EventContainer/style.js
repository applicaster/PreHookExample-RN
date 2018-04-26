import { StyleSheet } from 'react-native';
import { BORDER_RADIUS } from '../../constants/measurements';

export const styles = StyleSheet.create({
  eventContainer: {
    borderRadius: BORDER_RADIUS, // TODO: MAKE THIS CONFIGURABLE
    overflow: 'hidden',
  },
});
