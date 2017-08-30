import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { styles } from './style';
import TransformableImage from 'react-native-transformable-image';

const CLOSE_BUTTON = 'close_button';
class MediaDetailsScreen extends Component {
  getImageSize() {
    const { imageHeight, imageWidth } = this.props;
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;
    const aspectRatio = (imageWidth / imageHeight);
    let imageSize = styles.imageSize;

    if (imageWidth > imageHeight) {
      imageSize = {
        width: screenWidth,
        height: (screenWidth / aspectRatio),
      };
    } else if (imageHeight > imageWidth) {
      imageSize = {
        width: (screenHeight / aspectRatio),
        height: screenHeight, // TODO: modify after adding action buttons
      };
    }

    return imageSize;
  }

  render() {
    const { imageUrl, toggleModal } = this.props;
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
  imageHeight: PropTypes.number,
  imageWidth: PropTypes.number,
  imageUrl: PropTypes.string,
  toggleModal: PropTypes.func,
};

MediaDetailsScreen.contextTypes = {
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default MediaDetailsScreen;
