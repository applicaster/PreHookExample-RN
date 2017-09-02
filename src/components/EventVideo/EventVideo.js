import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Video from 'react-native-video';
import { styles } from './style';

class EventVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      muted: true,
    };

    this.toggleAudio = this.toggleAudio.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { eventId } = this.props;
    const { eventIdForActiveAudio: nextEventIdForActiveAudio } = nextProps;

    if (eventId !== nextEventIdForActiveAudio) {
      this.setState({ muted: true });
    }
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

  toggleAudio() {
    const { eventId, setEventIdForActiveAudio } = this.props;
    const { muted } = this.state;
    this.setState({ muted: !muted });
    setEventIdForActiveAudio(eventId);
  }

  render() {
    const { videoUrl } = this.props;
    if (!videoUrl) return null;
  
    const { muted } = this.state;
    return (<TouchableWithoutFeedback onPress={this.toggleAudio}>
      <Video
        source={{ uri: videoUrl }}
        muted={muted}
        resizeMode="cover"
        repeat
        style={[this.getMediaItemStyles(), styles.videoItem]}
      />
    </TouchableWithoutFeedback>);
  }
}

EventVideo.propTypes = {
  eventId: PropTypes.string,
  eventIdForActiveAudio: PropTypes.string,
  videoUrl: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  setEventIdForActiveAudio: PropTypes.func,
};

export default EventVideo;
