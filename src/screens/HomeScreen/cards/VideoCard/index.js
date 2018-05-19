import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import MediaVideo from '../components/MediaVideo';
import Caption from '../components/Caption';
import CardContainer from '../components/CardContainer';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { styles as videoStyles } from './style';
import { styles } from '../style';

export default class VideoCard extends Component {
  getTitleColor() {
    const COLOR_CHANGE_TRESHHOLD = 0x999999;
    const { backgroundColor } = this.context;
    const backgroundColorValue = parseInt(backgroundColor.substring(1), 16);
    if (backgroundColorValue < COLOR_CHANGE_TRESHHOLD) {
      return '#FFFFFF';
    }

    return '#000000';
  }

  activateCard() {
    // should open video full screen
  }

  renderVideoTitle() {
    const { caption, isEditorial } = this.props;
    if (isEditorial) {
      return <Text style={[videoStyles.videoTitle, { color: this.getTitleColor() }]}>{caption}</Text>;
    }

    return <Caption caption={caption} />;
  }

  render() {
    const { eventId, imageHeight, imageUrl, imageWidth, isEditorial, videoUrl } = this.props;
    const backgroundColorStyle = { backgroundColor: this.context.backgroundColor };
    
    return (
      <CardContainer clickable clickHandler={() => this.activateCard()}>
        <View style={[styles.eventContainer, backgroundColorStyle]}>
          <Header eventId={eventId} overlay />
          <MediaVideo
            eventId={eventId}
            height={imageHeight}
            imageUrl={imageUrl}
            videoUrl={videoUrl}
            width={imageWidth}
          />
          {this.renderVideoTitle()}
          {!isEditorial && <Footer eventId={eventId} />}
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
  isEditorial: PropTypes.bool.isRequired,
  videoUrl: PropTypes.string.isRequired,
};

VideoCard.contextTypes = {
  backgroundColor: PropTypes.string,
};
