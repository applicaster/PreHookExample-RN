import { StyleSheet } from 'react-native';

const closeButtonSize = 25;
export const styles = StyleSheet.create({
  mediaDetailsScreen: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#323232',
  },
  closeButton: {
    tintColor: '#FFFFFF',
    height: closeButtonSize,
    width: closeButtonSize,
    position: 'absolute',
    top: 30,
    left: 10,
    zIndex: 5,
  },
  buttonSlop: {
    right: 5,
    bottom: 5,
  },
});
