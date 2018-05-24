import {
  Dimensions,
  StyleSheet,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  mediaDetailsScreen: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#323232',
  },
  buttonSlop: {
    right: 5,
    bottom: 5,
  },
  imageSize: {
    width: screenWidth,
    height: screenWidth,
  },
  closeButton: {
    position: 'absolute',
    top: 45,
    right: 15,
    zIndex: 5,
  },
});
