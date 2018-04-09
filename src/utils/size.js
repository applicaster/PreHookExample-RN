import { Dimensions } from 'react-native';

export const getMediaDimensions = ({ height, width, screenMargin = 0 }) => {
  const screenWidth = Dimensions.get('window').width - (2 * screenMargin);
  let mediaItemStyles = {
    height: screenWidth,
    width: screenWidth,
  };
  
  if (width !== height) {
    const aspectRatio = (width / height);
    mediaItemStyles = {
      height: (screenWidth / aspectRatio),
      width: screenWidth,
    };
  }

  return mediaItemStyles;
};
