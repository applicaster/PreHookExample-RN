import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import LinearGradient from '@applicaster/react-native-linear-gradient';
import Video from '@applicaster/react-native-video';
import { styles } from './style';
import { getMediaDimensions } from '../../../../../utils/size';
import { SCREEN_MARGIN } from '../../../../../constants/measurements';

export default class MediaVideo extends Component {
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
    const { imageUrl, height, width, videoUrl } = this.props;
    const { muted } = this.state;

    return (
      <ImageBackground
        style={getMediaDimensions({ height, width, screenMargin: SCREEN_MARGIN })}
        source={{ uri: imageUrl }}
      >
        <TouchableWithoutFeedback onPress={this.toggleAudio}>
          <Video
            source={{ uri: videoUrl }}
            muted={muted}
            resizeMode="cover"
            repeat
            style={[getMediaDimensions({ height, width, screenMargin: SCREEN_MARGIN }), styles.videoItem]}
          />
        </TouchableWithoutFeedback>
        <LinearGradient style={ styles.headerVisor } colors={['rgba(0,0,0,0.7)', 'transparent']} />
      </ImageBackground>
    );
  }
}

MediaVideo.propTypes = {
  eventId: PropTypes.string.isRequired,
  eventIdForActiveAudio: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  setEventIdForActiveAudio: PropTypes.func,
  videoUrl: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

MediaVideo.contextTypes = {
  navigation: PropTypes.object,
};
