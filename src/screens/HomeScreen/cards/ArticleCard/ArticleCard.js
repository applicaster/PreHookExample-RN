import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import Caption from '../components/Caption';
import CardContainer from '../components/CardContainer';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MediaImage from '../components/MediaImage';
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

  render() {
    const { caption, category, eventId, imageHeight, imageUrl, imageWidth, summary } = this.props;
    const backgroundColorStyle = { backgroundColor: this.context.backgroundColor };
    const textColorStyle = { color: this.context.textColor || '#FFFFFF' };
    const titleColorStyle = { color: this.getTitleColor() };

    return (
      <CardContainer clickable clickHandler={() => this.activateCard()}>
        <View style={[styles.eventContainer, backgroundColorStyle]}>
          <Header eventId={eventId} overlay isEditorial />
          <View>
            <MediaImage
              height={imageHeight}
              imageUrl={imageUrl}
              width={imageWidth}
            />
          </View>
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
  setActiveEventId: PropTypes.func.isRequired,
  summary: PropTypes.string.isRequired,
};

ArticleCard.contextTypes = {
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};
