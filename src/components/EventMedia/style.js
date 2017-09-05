import {
  Dimensions,
  StyleSheet,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
export const styles = StyleSheet.create({
  mediaItem: {
    height: screenWidth,
    width: screenWidth,
    backgroundColor: 'black',
  },
  headerVisor: {
    height: 130,
    width: screenWidth,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
  },
});
