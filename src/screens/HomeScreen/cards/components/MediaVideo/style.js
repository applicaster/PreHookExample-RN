import { Dimensions, Platform, StyleSheet } from 'react-native';
import { SCREEN_MARGIN } from '../../../../../constants/measurements';

const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  headerVisor: {
    height: 80,
    width: screenWidth - (2 * SCREEN_MARGIN),
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
  },
  playVideoOverlay: {
    alignSelf: 'center',
    position: 'absolute',
    height: 65,
    width: 65,
    zIndex: 3,
  },
  imagePlaceHolder: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  videoAudioButton: {
    width: 48,
    height: 48,
    zIndex: 3,
  },
  videoAudioButtonContainer: {
    position: 'absolute',
    width: 48,
    height: 48,
    zIndex: 3,
    bottom: 15,
    right: Platform.OS === 'android' ? 30 : 15,
  },
});
