import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import CardContainer from '../components/CardContainer';
import Header from '../components/Header';
import MediaImage from '../components/MediaImage';
import MediaVideo from '../components/MediaVideo';
import { styles } from '../style';
import { styles as articleStyles } from './style';

export default class ArticleCard extends Component {
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
    const { setActiveEventId, eventId } = this.props;
    setActiveEventId(eventId);
    // TODO: Open article full screen here
  }
  
  renderMedia() {
    const { eventId, imageHeight, imageWidth, imageUrl, videoUrl } = this.props;
    if (videoUrl) {
      return (
        <MediaVideo
          eventId={eventId}
          height={imageHeight}
          imageUrl={imageUrl}
          videoUrl={videoUrl}
          width={imageWidth}
          isZoomed
        />
      );
    }

    return (
      <MediaImage
        height={imageHeight}
        imageUrl={imageUrl}
        width={imageWidth}
        isZoomed
      />
    );
  }

  render() {
    const { caption, category, eventId, summary } = this.props;
    const backgroundColorStyle = { backgroundColor: this.context.backgroundColor };
    const textColorStyle = { color: this.context.textColor || '#FFFFFF' };
    const titleColorStyle = { color: this.getTitleColor() };

    return (
      <CardContainer clickable clickHandler={() => this.activateCard()}>
        <View style={[styles.eventContainer, backgroundColorStyle]}>
          <Header eventId={eventId} overlay isEditorial />
          {this.renderMedia()}
          <Text style={[articleStyles.category, textColorStyle]}>{category.toUpperCase()}</Text>
          <Text style={[articleStyles.title, titleColorStyle]}>{caption}</Text>
          <Text style={[articleStyles.summary, textColorStyle]}>{summary}</Text>
        </View>
      </CardContainer>);
  }
}

ArticleCard.propTypes = {
  caption: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  eventId: PropTypes.string.isRequired,
  imageHeight: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  imageWidth: PropTypes.number.isRequired,
  videoUrl: PropTypes.string,
  setActiveEventId: PropTypes.func.isRequired,
  summary: PropTypes.string.isRequired,
};

ArticleCard.contextTypes = {
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};
