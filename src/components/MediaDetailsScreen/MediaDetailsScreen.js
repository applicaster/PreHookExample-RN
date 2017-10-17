import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import TransformableImage from '@applicaster/react-native-transformable-image';
import { styles } from './style';

const CLOSE_BUTTON = 'feed_rn_close_button';
class MediaDetailsScreen extends Component {
  getImageSize() {
    const { activeEvent } = this.props;
    const { height: imageHeight, width: imageWidth } = activeEvent.images.default;
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;
    const aspectRatio = (imageWidth / imageHeight);
    const calculatedHeight = (screenWidth / aspectRatio);
    let imageSize = styles.imageSize;

    if (imageWidth > imageHeight || calculatedHeight <= screenHeight) {
      imageSize = { width: screenWidth, height: calculatedHeight };
    } else if (imageHeight > imageWidth) {
      const calculatedWidth = (screenHeight * aspectRatio);
      imageSize = { width: calculatedWidth, height: screenHeight };
    }
    
    return imageSize;
  }

  render() {
    const { activeEvent, toggleModal } = this.props;
    const { url: imageUrl } = activeEvent.images.default;
    const { backgroundColor, textColor = '#FFFFFF' } = this.context;
    const screenBackgroundColor = { backgroundColor, flex: 1 };
    const closeButtonColor = { tintColor: `${textColor}99` };
    return (
      <View style={[styles.mediaDetailsScreen, screenBackgroundColor]}>
        <TouchableWithoutFeedback onPress={toggleModal}>
          <Image style={[styles.closeButton, closeButtonColor]} source={{ uri: CLOSE_BUTTON }} />
        </TouchableWithoutFeedback>
        <TransformableImage style={this.getImageSize()} source={{ uri: imageUrl }} />
      </View>
    );
  }
}

MediaDetailsScreen.propTypes = {
  activeEvent: PropTypes.object,
  toggleModal: PropTypes.func,
};

MediaDetailsScreen.contextTypes = {
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};

MediaDetailsScreen.defaultProps = {
  activeEvent: {
    images: {
      default: {},
    },
  },
};

export default MediaDetailsScreen;
