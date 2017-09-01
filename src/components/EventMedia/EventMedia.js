import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';
import { styles } from './style';

class EventMedia extends Component {
  constructor(props) {
    super(props);
    this.showMediaDetails = this.showMediaDetails.bind(this);
  }

  getMediaItemStyles() {
    const { width, height } = this.props;
    const screenWidth = Dimensions.get('window').width;
    let mediaItemStyles = styles.mediaItem;
    
    if (width !== height) {
      const aspectRatio = (width / height);
      mediaItemStyles = {
        height: (screenWidth / aspectRatio),
        width: screenWidth,
      };
    }

    return mediaItemStyles;
  }
  
  showMediaDetails() {
    const { toggleModal, id } = this.props;
    toggleModal({
      activeEventId: id,
    });
  }

  renderVideo() {
    const { videoUrl } = this.props;
    return videoUrl
    ? (<Video
      source={{ uri: videoUrl }}
      muted
      resizeMode="cover"
      repeat
      style={[this.getMediaItemStyles(), styles.videoItem]}
    />)
    : null;
  }

  render() {
    const { imageUrl } = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.showMediaDetails}>
        <ImageBackground
          style={this.getMediaItemStyles()}
          source={{ uri: imageUrl }}
        >
          {this.renderVideo()}
          <LinearGradient style={ styles.headerVisor } colors={['rgba(0,0,0,0.7)', 'transparent']} />
        </ImageBackground>
      </TouchableWithoutFeedback>
    );
  }
}

EventMedia.propTypes = {
  id: PropTypes.string,
  imageUrl: PropTypes.string,
  height: PropTypes.number,
  videoUrl: PropTypes.string,
  width: PropTypes.number,
  toggleModal: PropTypes.func,
};

EventMedia.contextTypes = {
  navigation: PropTypes.object,
};

export default EventMedia;
