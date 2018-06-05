import { StyleSheet } from 'react-native';

const buttonSize = 54;
const pencilSize = 17;
export const styles = StyleSheet.create({
  writePostButtonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: buttonSize,
    width: buttonSize,
  },
  writePostButton: {
    height: buttonSize,
    width: buttonSize,
    shadowColor: '#000000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  writePostPencil: {
    height: pencilSize,
    width: pencilSize,
    bottom: 20,
    right: 18,
    position: 'absolute',
  },
});
