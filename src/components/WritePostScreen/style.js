import {
  Dimensions,
  StyleSheet,
} from 'react-native';

const window = Dimensions.get('window');

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
    paddingHorizontal: 10,
    paddingTop: 15,
    width: window.width,
  },
  postBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 65,
    width: window.width,
  },
  postButton: {
    position: 'absolute',
    right: 12,
    top: 32,
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
    height: 45,
    width: window.width,
  },
});
