import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './style';
import EventVideo from '../EventVideo';

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
    const { toggleModal, eventId } = this.props;
    toggleModal({
      activeEventId: eventId,
    });
  }

  renderVideo() {
    const { eventId, width, height, videoUrl } = this.props;
    return <EventVideo eventId={eventId} videoUrl={videoUrl} width={width} height={height} />;
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
  eventId: PropTypes.string,
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
