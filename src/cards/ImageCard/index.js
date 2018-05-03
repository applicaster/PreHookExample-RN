import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Caption from '../components/Caption';
import CardContainer from '../components/CardContainer';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MediaImage from '../components/MediaImage';
import { styles } from '../style';

export default class ImageCard extends Component {
  clickHandler() {
    // should open image screen
    // passed to CardContainer
  }

  render() {
    const { caption, eventId, imageHeight, imageUrl, imageWidth } = this.props;
    const backgroundColorStyle = { backgroundColor: this.context.backgroundColor };

    return (
      <CardContainer>
        <View style={[styles.eventContainer, backgroundColorStyle]}>
          <Header eventId={eventId} />
          <MediaImage
            height={imageHeight}
            imageUrl={imageUrl}
            width={imageWidth}
          />
          <Caption caption={caption} />
          <Footer eventId={eventId} />
        </View>
      </CardContainer>);
  }
}

ImageCard.propTypes = {
  caption: PropTypes.string.isRequired,
  eventId: PropTypes.string.isRequired,
  imageHeight: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  imageWidth: PropTypes.number.isRequired,
};

ImageCard.contextTypes = {
  backgroundColor: PropTypes.string,
};
