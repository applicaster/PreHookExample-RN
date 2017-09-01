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
  videoItem: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  headerVisor: {
    height: 130,
  },
});
