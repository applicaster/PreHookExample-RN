import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  Easing,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import LinearGradient from '@applicaster/react-native-linear-gradient';
import Video from '@applicaster/react-native-video';
import FadeContainer from '../FadeContainer';
import { styles } from './style';
import { getMediaDimensions } from '../../../../../utils/size';
import { SCREEN_MARGIN } from '../../../../../constants/measurements';
import { VIDEO_AUDIO_ON_BUTTON, VIDEO_AUDIO_MUTED_BUTTON } from '../../../../../icons';


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

  renderAudioButton() {
    const { eventId, muted } = this.state;

    const audioOnButton = (
      <FadeContainer key={`${eventId}-audioOnBtn`} visible={!muted}>
        <TouchableWithoutFeedback onPress={this.toggleAudio}>
          <Image
            style={[styles.videoAudioButton]}
            source={{ uri: VIDEO_AUDIO_ON_BUTTON }}
          />
        </TouchableWithoutFeedback>
      </FadeContainer>
    );

    const audioMutedbutton = (
      <FadeContainer key={`${eventId}-mutedBtn`} visible={muted}>
        <TouchableWithoutFeedback onPress={this.toggleAudio}>
          <Image
            style={[styles.videoAudioButton]}
            source={{ uri: VIDEO_AUDIO_MUTED_BUTTON }}
          />
        </TouchableWithoutFeedback>
      </FadeContainer>
    );

    return [audioOnButton, audioMutedbutton];
  }

  render() {
    const { imageUrl, isZoomed, height, width, videoUrl } = this.props;
    const { muted } = this.state;

    return (
      <ImageBackground
        style={getMediaDimensions({ height, width, screenMargin: SCREEN_MARGIN, isZoomed })}
        source={{ uri: imageUrl }}
      >
        <Video
          source={{ uri: videoUrl }}
          muted={muted}
          resizeMode="cover"
          repeat
          style={[getMediaDimensions({ height, width, screenMargin: SCREEN_MARGIN, isZoomed })]}
          playInBackground={false}
          playWhenInactive={false}
        />
        {this.renderAudioButton()}
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
  isZoomed: PropTypes.bool.isRequired,
  setEventIdForActiveAudio: PropTypes.func,
  videoUrl: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

MediaVideo.defaultProps = {
  isZoomed: false,
};

MediaVideo.contextTypes = {
  navigation: PropTypes.object,
};
