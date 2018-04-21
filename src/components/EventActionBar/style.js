import { Dimensions, StyleSheet } from 'react-native';
import { SCREEN_MARGIN } from '../../constants/measurements';

const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  actionBar: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    height: 30,
    paddingHorizontal: 0,
    marginBottom: 7,
  },
  overlayBar: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    paddingLeft: 10,
    width: screenWidth - (2 * SCREEN_MARGIN),
  },
  caption: {
    fontSize: 10.5,
  },
  shareButtonContainer: {
    position: 'absolute',
    bottom: 3,
    right: 7,
  },
});
