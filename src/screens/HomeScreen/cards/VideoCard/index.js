import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import MediaVideo from './MediaVideo';
import Caption from '../components/Caption';
import CardContainer from '../components/CardContainer';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { styles } from '../style';

export default class VideoCard extends Component {
  activateCard() {
    // should open image screen
    // passed to CardContainer
  }

  render() {
    const { caption, eventId, imageHeight, imageUrl, imageWidth, videoUrl } = this.props;
    const backgroundColorStyle = { backgroundColor: this.context.backgroundColor };

    return (
      <CardContainer>
        <View style={[styles.eventContainer, backgroundColorStyle]}>
          <Header eventId={eventId} overlay />
          <MediaVideo
            eventId={eventId}
            height={imageHeight}
            imageUrl={imageUrl}
            videoUrl={videoUrl}
            width={imageWidth}
          />
          <Caption caption={caption} />
          <Footer eventId={eventId} />
        </View>
      </CardContainer>);
  }
}

VideoCard.propTypes = {
  caption: PropTypes.string.isRequired,
  eventId: PropTypes.string.isRequired,
  imageHeight: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  imageWidth: PropTypes.number.isRequired,
  videoUrl: PropTypes.string.isRequired,
};

VideoCard.contextTypes = {
  backgroundColor: PropTypes.string,
};
