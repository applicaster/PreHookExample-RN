import { Dimensions, StyleSheet } from 'react-native';
import { SCREEN_MARGIN } from '../../../../constants/measurements';

const width = Dimensions.get('window').width;
export const styles = StyleSheet.create({
  titleEditorial: {
    fontSize: 21,
    lineHeight: 24,
    fontWeight: '800',
    marginTop: 6,
    color: '#000000',
  },
  category: {
    fontSize: 14,
    color: '#4A4A4A',
    opacity: 0.75,
    fontWeight: 'bold',
    marginTop: 16,
  },
  closeButton: {
    height: 38,
    width: 38,
    zIndex: 3,
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
    height: 38,
    width: 38,
    zIndex: 3,
  },
  headerContainer: {
    position: 'absolute',
    zIndex: 3,
    height: 43,
    width: width - (2 * SCREEN_MARGIN),
  },
  title: {
    fontSize: 18,
    lineHeight: 23,
    color: '#353333',
    fontWeight: '600',
    marginTop: 16,
  },
});
