import { StyleSheet } from 'react-native';

const buttonSize = 60;
export const styles = StyleSheet.create({
  writePostButtonContainer: {
    position: 'absolute',
    bottom: 15,
    right: 10,
    height: buttonSize,
    width: buttonSize,
  },
  writePostButton: {
    height: buttonSize,
    width: buttonSize,
  },
  writePostPencil: {
    height: 35,
    width: 30,
    bottom: 15,
    right: 14,
    position: 'absolute',
  },
});
