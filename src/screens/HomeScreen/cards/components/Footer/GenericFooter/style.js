import { Dimensions, StyleSheet } from 'react-native';
import { SCREEN_MARGIN } from '../../../../../../constants/measurements';

const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  actionBar: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 30,
    paddingHorizontal: 7,
    marginBottom: 8,
    width: screenWidth - (2 * SCREEN_MARGIN),
  },
  overlayBar: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
  },
  caption: {
    fontSize: 12,
    paddingLeft: 3,
    width: screenWidth - (2 * SCREEN_MARGIN) - 50,
  },
  shareButtonContainer: {
    width: 30,
    height: 30,
  },
});
