import {
  Dimensions,
  Platform,
  StyleSheet,
} from 'react-native';

const window = Dimensions.get('window');
const barHeight = 45;

export const styles = StyleSheet.create({
  writePostScreen: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#323232',
  },
  input: {
    height: 205,
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
    height: barHeight + 20,
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
    height: barHeight,
    width: window.width,
  },
});
