import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { styles } from './style';
import MediaVideo from '../HomeScreen/cards/components/MediaVideo';
import CloseButton from '../../buttons/CloseButton';

class VideoScreen extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }

  componentWillUnmount() {
    this.props.setNoActiveEvent();
  }

  close() {
    this.context.navigation.goBack();
  }

  renderVideo() {
    const { eventId, videoHeight, videoWidth, imageUrl, videoUrl } = this.props;
    if (videoUrl) {
      return (
        <View style={styles.videoContainer}>
          <MediaVideo
            eventId={eventId}
            height={videoHeight}
            imageUrl={imageUrl}
            videoUrl={videoUrl}
            width={videoWidth}
            isExpanded
            isZoomed
            shouldAnimate={false}
          />
        </View>
      );
    }

    return null;
  }

  render() {
    const { backgroundColor } = this.context;
    const screenBackgroundColorStyles = { backgroundColor, flex: 1 };
    
    return (
      <View style={[screenBackgroundColorStyles]}>
        <CloseButton onPress={this.close} style={styles.closeButton} />
        {this.renderVideo()}
      </View>
    );
  }
}

VideoScreen.propTypes = {
  eventId: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  setNoActiveEvent: PropTypes.func.isRequired,
  videoHeight: PropTypes.number.isRequired,
  videoWidth: PropTypes.number.isRequired,
  videoUrl: PropTypes.string.isRequired,
};

VideoScreen.contextTypes = {
  backgroundColor: PropTypes.string,
  navigation: PropTypes.object,
  textColor: PropTypes.string,
};

export default VideoScreen;
