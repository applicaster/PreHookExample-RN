import { Dimensions, StyleSheet } from 'react-native';
import { SCREEN_MARGIN } from '../../../../../constants/measurements';

const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  headerVisor: {
    height: 130,
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
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
});
