import { Dimensions } from 'react-native';

export const getMediaDimensions = ({ height, width, screenMargin = 0, isZoomed = false }) => {
  const windowWidth = Dimensions.get('window').width;
  const screenWidth = (isZoomed) ? windowWidth : windowWidth - (2 * screenMargin);
  
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

  if (isZoomed) {
    mediaItemStyles.marginLeft = -screenMargin;
  }

  return mediaItemStyles;
};
