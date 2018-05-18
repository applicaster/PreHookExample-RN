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

const AUDIO_CONTROL_FADE_DURATION = 500;

export default class MediaVideo extends Component {
  constructor(props) {
    super(props);
    const { isInViewport } = props;
    this.state = {
      audioControlsVisible: true,
      muted: true,
      paused: !isInViewport,
    };

    this.toggleAudio = this.toggleAudio.bind(this);
    this.audioControlsVisibilityValue = new Animated.Value(0);
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
      this.fadeAudioControl({ fadeIn: false });
      clearTimeout(this.audioVisibilityTimer);
    } else if (enteredViewport) {
      pausedStateToSet = false;
      this.fadeAudioControl({ fadeIn: true });
      this.setAudioControlFadeTimer();
    }

    if (muteStateToSet !== muted || pausedStateToSet !== paused) {
      this.setState({
        muted: muteStateToSet,
        paused: pausedStateToSet,
      });
    }
  }

  setAudioControlFadeTimer() {
    const AUDIO_CONTROLS_IDLE_DURATION = 4000;
    clearTimeout(this.audioVisibilityTimer);
    this.audioVisibilityTimer = setTimeout(() => {
      this.fadeAudioControl({ fadeIn: false });
    }, AUDIO_CONTROLS_IDLE_DURATION);
  }

  fadeAudioControl(fadeConfig) {
    const { fadeIn } = fadeConfig;
    const animationToValue = (fadeIn) ? 1 : 0;
    const controlsVisibility = !!fadeIn;

    Animated.timing(
      this.audioControlsVisibilityValue,
      {
        toValue: animationToValue,
        duration: AUDIO_CONTROL_FADE_DURATION,
        easing: Easing.linear,
        useNativeDriver: true,
      }
    ).start(() => this.setState({ audioControlsVisible: controlsVisibility }));
  }

  toggleAudio() {
    const { eventId, setEventIdForActiveAudio } = this.props;
    
    if (this.state.audioControlsVisible) {
      this.setState({ muted: !this.state.muted });
      setEventIdForActiveAudio(eventId);
      this.setAudioControlFadeTimer();
    }
  }

  renderAudioButton() {
    const { eventId, muted } = this.state;
    const audioButton = (mutedState, buttonIcon) => (
      <FadeContainer key={`${eventId}-${buttonIcon}`} visible={mutedState} duration={350}>
        <TouchableWithoutFeedback onPress={this.toggleAudio}>
          <Image
            style={[styles.videoAudioButton]}
            source={{ uri: buttonIcon }}
          />
        </TouchableWithoutFeedback>
      </FadeContainer>
    );

    const audioOnButton = audioButton(!muted, VIDEO_AUDIO_ON_BUTTON);
    const audioMutedbutton = audioButton(muted, VIDEO_AUDIO_MUTED_BUTTON);
    const audioControlsStyles = {
      opacity: this.audioControlsVisibilityValue,
    };
    
    return <Animated.View style={audioControlsStyles}>{[audioOnButton, audioMutedbutton]}</Animated.View>;
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
