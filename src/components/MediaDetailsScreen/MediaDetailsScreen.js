import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  View,
} from 'react-native';
import TransformableImage from '@applicaster/react-native-transformable-image';
import { styles } from './style';
import CloseButton from '../CloseButton';

class MediaDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

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

  closeModal() {
    const { toggleModal } = this.props;
    toggleModal({ modal: 'MediaModal' });
  }

  render() {
    const { activeEvent } = this.props;
    const { url: imageUrl } = activeEvent.images.default;
    const { backgroundColor } = this.context;
    const screenBackgroundColor = { backgroundColor, flex: 1 };
    
    return (
      <View style={[styles.mediaDetailsScreen, screenBackgroundColor]}>
        <CloseButton onPress={this.closeModal} isForModal />
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
