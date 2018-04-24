import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from '@applicaster/react-native-linear-gradient';
import { sendAnalyticEvent } from 'react-native-zapp-bridge';
import { IMAGE_DETAIL_CLICKED } from '../../constants/analyticEvents';
import { styles } from './style';
import EventVideo from '../EventVideo';
import { getMediaDimensions } from '../../utils/size';
import { SCREEN_MARGIN } from '../../constants/measurements';

class EventMedia extends Component {
  constructor(props) {
    super(props);
    this.showMediaDetails = this.showMediaDetails.bind(this);
  }
  
  showMediaDetails() {
    const { toggleModal, setActiveEventId, eventId, isInteractive } = this.props;
    if (!isInteractive) return;
    
    setActiveEventId(eventId);
    toggleModal({ modal: 'MediaModal' });
    sendAnalyticEvent(IMAGE_DETAIL_CLICKED, { eventId }).then().catch();
  }

  renderVideo() {
    const { eventId, width, height, videoUrl } = this.props;
    return <EventVideo eventId={eventId} videoUrl={videoUrl} width={width} height={height} />;
  }

  render() {
    const { isInteractive, imageUrl, height, width, videoUrl } = this.props;
    const mediaItem = (
      <ImageBackground
        style={getMediaDimensions({ height, width, screenMargin: SCREEN_MARGIN })}
        source={{ uri: imageUrl }}
      >
        {videoUrl && this.renderVideo()}
        <LinearGradient style={ styles.headerVisor } colors={['rgba(0,0,0,0.7)', 'transparent']} />
      </ImageBackground>);

    if (isInteractive) {
      return <TouchableWithoutFeedback onPress={this.showMediaDetails}>{mediaItem}</TouchableWithoutFeedback>;
    }

    return mediaItem;
  }
}

EventMedia.propTypes = {
  eventId: PropTypes.string,
  imageUrl: PropTypes.string,
  isInteractive: PropTypes.bool,
  height: PropTypes.number,
  videoUrl: PropTypes.string,
  width: PropTypes.number,
  toggleModal: PropTypes.func,
  setActiveEventId: PropTypes.func,
};

EventMedia.contextTypes = {
  navigation: PropTypes.object,
};

export default EventMedia;
