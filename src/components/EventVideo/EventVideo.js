import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native';
import Video from '@applicaster/react-native-video';
import { styles } from './style';
import { getMediaDimensions } from '../../utils/size';

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

  toggleAudio() {
    const { eventId, setEventIdForActiveAudio } = this.props;
    const { muted } = this.state;
    this.setState({ muted: !muted });
    setEventIdForActiveAudio(eventId);
  }

  render() {
    const { height, width, videoUrl } = this.props;
    if (!videoUrl) return null;
  
    const { muted } = this.state;
    return (<TouchableWithoutFeedback onPress={this.toggleAudio}>
      <Video
        source={{ uri: videoUrl }}
        muted={muted}
        resizeMode="cover"
        repeat
        style={[getMediaDimensions({ height, width }), styles.videoItem]}
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
