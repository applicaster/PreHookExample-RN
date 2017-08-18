import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
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

class EventMedia extends Component {
  getMediaItemStyles() {
    const { width, height } = this.props;
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
      <ImageBackground
        style={this.getMediaItemStyles()}
        source={{ uri: imageUrl }}
      >
        {this.renderVideo()}
        <LinearGradient style={ styles.headerVisor } colors={['rgba(0,0,0,0.7)', 'transparent']} />
      </ImageBackground>
    );
  }
}

EventMedia.propTypes = {
  imageUrl: PropTypes.string,
  height: PropTypes.number,
  videoUrl: PropTypes.string,
  width: PropTypes.number,
};

export default EventMedia;
