import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import MediaImage from '../components/MediaImage';
import CardContainer from '../components/CardContainer';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Caption from '../components/Caption';
import { styles } from '../style';

export default class LinkCard extends Component {
  activateCard() {
    const { url } = this.props;
    const { navigation } = this.context;
    navigation.navigate('GenericWebView', { headerTitle: '', url });
  }

  render() {
    const { caption, eventId, imageHeight, imageUrl, imageWidth, source } = this.props;
    const backgroundColorStyle = { backgroundColor: this.context.backgroundColor };
    const mediaImage = (imageUrl)
      ? (<MediaImage
        height={imageHeight}
        imageUrl={imageUrl}
        width={imageWidth}
      />)
      : null;

    return (
      <CardContainer clickable clickHandler={() => this.activateCard()}>
        <View style={[styles.eventContainer, backgroundColorStyle]}>
          <Header eventId={eventId} overlay={!!imageUrl} />
          {mediaImage}
          {source !== 'cms' && <Caption caption={caption} />}
          <Footer caption={caption} eventId={eventId} overlay={source === 'cms'} />
        </View>
      </CardContainer>);
  }
}

LinkCard.propTypes = {
  caption: PropTypes.string,
  eventId: PropTypes.string.isRequired,
  imageHeight: PropTypes.number,
  imageUrl: PropTypes.string,
  imageWidth: PropTypes.number,
  source: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

LinkCard.defaultProps = {
  caption: '',
  imageHeight: 0,
  imageWidth: 0,
  imageUrl: '',
};

LinkCard.contextTypes = {
  backgroundColor: PropTypes.string,
  navigation: PropTypes.object,
};
