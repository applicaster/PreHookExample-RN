import {
  Dimensions,
  Platform,
  StyleSheet,
} from 'react-native';
import { SCREEN_MARGIN } from '../../../../../constants/measurements';

const iOS = 'ios';
const width = Dimensions.get('window').width;
export const styles = StyleSheet.create({
  eventHeader: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  eventHeaderOverlay: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    width: width - (2 * SCREEN_MARGIN),
    zIndex: 2,
  },
  eventHeaderInfo: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 10,
    height: 43,
    width: 220,
  },
  eventHeaderInfoWithoutUserName: {
    justifyContent: 'center',
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 4,
  },
  name: {
    fontSize: 14,
    marginTop: (Platform.OS === iOS) ? -3 : -4,
    fontWeight: '600',
  },
  userName: {
    fontSize: 10,
  },
  socialIconContainer: {
    right: 9,
    top: 9,
    position: 'absolute',
  },
});
