import {
  
  Dimensions,
  StyleSheet,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
export const styles = StyleSheet.create({
  eventVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  mediaItem: {
    height: screenWidth,
    width: screenWidth,
  },
});
