import {
  Dimensions,
  StyleSheet,
} from 'react-native';
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
});
