import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  Easing,
  Image,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LinearGradient from '@applicaster/react-native-linear-gradient';
import Video from '@applicaster/react-native-video';
import FadeContainer from '../FadeContainer';
import { styles } from './style';
import { getMediaDimensions } from '../../../../../utils/size';
import { SCREEN_MARGIN } from '../../../../../constants/measurements';
import { PLAY_VIDEO_OVERLAY, VIDEO_AUDIO_ON_BUTTON, VIDEO_AUDIO_MUTED_BUTTON } from '../../../../../icons';

const AUDIO_CONTROL_FADE_DURATION = 500;

export default class MediaVideo extends Component {
  constructor(props) {
    super(props);
    const { isInViewport, shouldAnimate } = props;
    this.state = {
      audioControlsVisible: true,
      muted: true,
      paused: !isInViewport,
    };

    this.toggleAudio = this.toggleAudio.bind(this);
    this.audioControlsVisibilityValue = new Animated.Value(0);
    this.playOverlayVisibilityValue = new Animated.Value(1);
    this.grandientAnimatedValue = new Animated.Value(shouldAnimate ? 1 : 0);
    this.audioVisibilityTimer = null;
  }

  componentWillReceiveProps(nextProps) {
    const { eventId, isInViewport, isExpanded, shouldAnimate } = this.props;
    const { muted, paused } = this.state;
    const { eventIdForActiveAudio: nextEventIdForActiveAudio, isInViewport: nextIsInViewport, isExpanded: nextIsExpanded } = nextProps;

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
      this.fade({ fadeIn: true, animationValue: this.playOverlayVisibilityValue });
      this.fade({ fadeIn: false, animationValue: this.audioControlsVisibilityValue, doneCallback: () => this.setState({ audioControlsVisible: false }) });
      clearTimeout(this.audioVisibilityTimer);
    } else if (enteredViewport) {
      pausedStateToSet = false;
      this.fade({ fadeIn: false, animationValue: this.playOverlayVisibilityValue });
      this.fade({ fadeIn: true, animationValue: this.audioControlsVisibilityValue, doneCallback: () => this.setState({ audioControlsVisible: true }) });
      this.setAudioControlFadeTimer();
    }

    if (nextIsExpanded || isExpanded) {
      if (nextIsExpanded) {
        clearTimeout(this.audioVisibilityTimer);
        this.fade({ fadeIn: false, animationValue: this.playOverlayVisibilityValue });
        this.fade({ fadeIn: true, animationValue: this.audioControlsVisibilityValue, doneCallback: () => this.setState({ audioControlsVisible: true }) });
        pausedStateToSet = false;
        if (!muted) muteStateToSet = false;
      } else {
        this.fade({ fadeIn: !nextIsInViewport, animationValue: this.playOverlayVisibilityValue });
        this.fade({ fadeIn: true, animationValue: this.audioControlsVisibilityValue, doneCallback: () => this.setState({ audioControlsVisible: true }) });
        this.setAudioControlFadeTimer();
        muteStateToSet = true;
        pausedStateToSet = !isInViewport;
      }
    }

    if (muteStateToSet !== muted || pausedStateToSet !== paused) {
      this.setState({
        muted: muteStateToSet,
        paused: pausedStateToSet,
      });
    }

    if (!shouldAnimate) return;

    const gradientAnimationDuration = (nextIsExpanded) ? 200 : 1000;
  
    if (nextIsExpanded !== isExpanded) {
      Animated.timing(
        this.grandientAnimatedValue,
        {
          toValue: (nextIsExpanded) ? 0 : 1,
          duration: gradientAnimationDuration,
          useNativeDriver: true,
        }).start();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.audioVisibilityTimer);
  }

  setAudioControlFadeTimer() {
    const AUDIO_CONTROLS_IDLE_DURATION = 6000;

    clearTimeout(this.audioVisibilityTimer);

    this.audioVisibilityTimer = setTimeout(() => {
      this.fade({
        fadeIn: false,
        animationValue: this.audioControlsVisibilityValue,
        doneCallback: () => this.setState({ audioControlsVisible: false }),
      });
    }, AUDIO_CONTROLS_IDLE_DURATION);
  }

  getMediaStyles() {
    const { isZoomed, isExpanded, height, width } = this.props;
    const mediaDimensions = getMediaDimensions({ height, width, screenMargin: SCREEN_MARGIN, isZoomed });
    const leftValueWhenZoomed = isExpanded ? 0 : -SCREEN_MARGIN;

    return {
      ...mediaDimensions,
      left: (isZoomed) ? leftValueWhenZoomed : 0,
    };
  }

  fade(fadeConfig) {
    const { fadeIn, animationValue, doneCallback = () => {} } = fadeConfig;
    Animated.timing(
      animationValue,
      {
        toValue: (fadeIn) ? 1 : 0,
        duration: AUDIO_CONTROL_FADE_DURATION,
        easing: Easing.linear,
        useNativeDriver: true,
      }
    ).start(doneCallback);
  }

  toggleAudio() {
    const { eventId, setEventIdForActiveAudio, isExpanded } = this.props;
    
    if (this.state.audioControlsVisible) {
      this.setState({ muted: !this.state.muted });
      setEventIdForActiveAudio(eventId);
      !isExpanded && this.setAudioControlFadeTimer();
    }
  }

  renderAudioButton() {
    const { eventId, muted } = this.state;

    const audioButton = (mutedState, buttonIcon) => (
      <FadeContainer style={styles.videoAudioButtonContainer} key={`${eventId}-${buttonIcon}`} visible={mutedState} duration={350}>
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
    const audioControlsStyles = { opacity: this.audioControlsVisibilityValue };
    
    return (
      <Animated.View key={'audioButtons'} style={[styles.videoAudioButtonsWrapper, audioControlsStyles]}>
        {[audioOnButton, audioMutedbutton]}
      </Animated.View>);
  }

  renderPlayOverlay() {
    const playVideoOverlayOpacityStyles = { opacity: this.playOverlayVisibilityValue };
    return (<Animated.Image
      style={[styles.playVideoOverlay, playVideoOverlayOpacityStyles]}
      source={{ uri: PLAY_VIDEO_OVERLAY }}
    />);
  }

  render() {
    const { shouldAnimate, videoUrl } = this.props;
    const { muted, paused } = this.state;

    const headerVisorContainerStyles = {
      opacity: shouldAnimate ? this.grandientAnimatedValue : 0,
    };

    return ([
      <View
        key={'imageBackground'}
        style={[styles.videoContainer]}
      >
        {this.renderPlayOverlay()}
        {this.renderAudioButton()}
        <Video
          source={{ uri: videoUrl }}
          muted={muted}
          paused={paused}
          resizeMode="cover"
          repeat
          style={this.getMediaStyles()}
          playInBackground={false}
          playWhenInactive={false}
        />
      </View>,
      <Animated.View key={'headerGradient'} style={[styles.headerVisor, headerVisorContainerStyles]}>
        <LinearGradient style={ styles.headerVisor } colors={['rgba(0,0,0,0.7)', 'transparent']} />
      </Animated.View>,
    ]);
  }
}

MediaVideo.propTypes = {
  eventId: PropTypes.string.isRequired,
  eventIdForActiveAudio: PropTypes.string,
  height: PropTypes.number.isRequired,
  isZoomed: PropTypes.bool.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  isInViewport: PropTypes.bool.isRequired,
  setEventIdForActiveAudio: PropTypes.func,
  shouldAnimate: PropTypes.bool.isRequired,
  videoUrl: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

MediaVideo.defaultProps = {
  isZoomed: false,
  isExpanded: false,
  isInViewport: false,
  shouldAnimate: true,
};
