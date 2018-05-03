import {
  Dimensions,
  StyleSheet,
} from 'react-native';

const window = Dimensions.get('window');
export const BAR_HEIGHT = 45;
export const STATUS_BAR_HEIGHT = 20;

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
    justifyContent: 'center',
    height: BAR_HEIGHT + STATUS_BAR_HEIGHT,
    width: window.width,
  },
  postButton: {
    position: 'absolute',
    right: 12,
    top: 31,
  },
  postButtonLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  writePostLabel: {
    fontWeight: '600',
    fontSize: 18,
    top: 32,
  },
  postOptionsBar: {
    alignItems: 'center',
    flexDirection: 'row',
    height: BAR_HEIGHT,
    width: window.width,
  },
});
