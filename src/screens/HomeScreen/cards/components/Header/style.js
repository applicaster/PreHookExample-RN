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
    paddingHorizontal: 13,
    paddingTop: 12,
    height: 43,
  },
  eventHeaderOverlay: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    width: width - (2 * SCREEN_MARGIN),
    zIndex: 3,
  },
  eventHeaderInfo: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 43,
    width: 220,
  },
  eventHeaderInfoWithoutUserName: {
    justifyContent: 'center',
  },
  eventHeaderOnlyTimestamp: {
    justifyContent: 'flex-start',
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 4,
    marginRight: 10,
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
