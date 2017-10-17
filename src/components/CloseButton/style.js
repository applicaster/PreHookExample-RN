import {
  StyleSheet,
} from 'react-native';

const closeButtonSize = 25;

export const styles = StyleSheet.create({
  closeButton: {
    tintColor: '#FFFFFF',
    height: closeButtonSize,
    width: closeButtonSize,
    marginLeft: 5,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 30,
    left: 5,
    zIndex: 5,
  },
});
