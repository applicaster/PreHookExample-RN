import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  Dimensions,
  StyleSheet,
} from 'react-native';

const window = Dimensions.get('window');
export const BAR_HEIGHT = 45;
export const STATUS_BAR_HEIGHT = getStatusBarHeight();

export const styles = StyleSheet.create({
  writePostScreen: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#323232',
  },
  input: {
    fontSize: 20,
    backgroundColor: '#FFFFFF',
    color: '#000000',
    paddingHorizontal: 10,
    paddingTop: 15,
    textAlignVertical: 'top',
    width: window.width,
  },
  postBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 20,
    height: BAR_HEIGHT + STATUS_BAR_HEIGHT,
    width: window.width,
  },
  postButton: {
  },
  postButtonLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  writePostLabel: {
    fontWeight: '600',
    fontSize: 18,
  },
  postOptionsBar: {
    alignItems: 'center',
    flexDirection: 'row',
    height: BAR_HEIGHT,
    width: window.width,
  },
  closeButton: {
    height: 38,
    width: 38,
  },
});
