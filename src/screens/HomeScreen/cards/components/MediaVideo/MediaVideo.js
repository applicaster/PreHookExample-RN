import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
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
    const { isInViewport } = props;
    this.state = {
      muted: true,
      paused: !isInViewport,
    };

    this.toggleAudio = this.toggleAudio.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { eventId, isInViewport } = this.props;
    const { muted, paused } = this.state;
    const { eventIdForActiveAudio: nextEventIdForActiveAudio, isInViewport: nextIsInViewport } = nextProps;

    const leftViewport = (isInViewport !== nextIsInViewport && !nextIsInViewport);
    const enteredViewport = (isInViewport !== nextIsInViewport && nextIsInViewport);
    const otherVideoAudioActivated = (eventId !== nextEventIdForActiveAudio);

    let muteStateToSet = muted;
    let pausedStateToSet = paused;

    if (otherVideoAudioActivated) {
      muteStateToSet = true;
    }

    if (leftViewport) {
      muteStateToSet = true;
      pausedStateToSet = true;
    } else if (enteredViewport) {
      pausedStateToSet = false;
    }

    if (muteStateToSet !== muted || pausedStateToSet !== paused) {
      this.setState({
        muted: muteStateToSet,
        paused: pausedStateToSet,
      });
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
      <FadeContainer key={`${eventId}-audioOnBtn`} visible={!muted} duration={350}>
        <TouchableWithoutFeedback onPress={this.toggleAudio}>
          <Image
            style={[styles.videoAudioButton]}
            source={{ uri: VIDEO_AUDIO_ON_BUTTON }}
          />
        </TouchableWithoutFeedback>
      </FadeContainer>
    );

    const audioMutedbutton = (
      <FadeContainer key={`${eventId}-mutedBtn`} visible={muted} duration={350}>
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
    const { muted, paused } = this.state;

    return (
      <ImageBackground
        style={getMediaDimensions({ height, width, screenMargin: SCREEN_MARGIN, isZoomed })}
        source={{ uri: imageUrl }}
      >
        <Video
          source={{ uri: videoUrl }}
          muted={muted}
          paused={paused}
          resizeMode="cover"
          repeat
          style={[getMediaDimensions({ height, width, screenMargin: SCREEN_MARGIN, isZoomed })]}
          playInBackground={false}
          playWhenInactive={false}
        />
        {this.renderAudioButton()}
        <LinearGradient style={ styles.headerVisor } colors={['rgba(0,0,0,0.7)', 'transparent']} />
      </ImageBackground>);
  }
}

MediaVideo.propTypes = {
  eventId: PropTypes.string.isRequired,
  eventIdForActiveAudio: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  isZoomed: PropTypes.bool.isRequired,
  isInViewport: PropTypes.bool.isRequired,
  setEventIdForActiveAudio: PropTypes.func,
  videoUrl: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

MediaVideo.defaultProps = {
  isZoomed: false,
  isInViewport: false,
};
