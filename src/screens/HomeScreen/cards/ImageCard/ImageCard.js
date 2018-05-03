import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback, View } from 'react-native';
import { sendAnalyticEvent } from 'react-native-zapp-bridge';
import { IMAGE_DETAIL_CLICKED } from '../../../../constants/analyticEvents';
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

  showMediaDetails() {
    const { toggleModal, setActiveEventId, eventId } = this.props;
    setActiveEventId(eventId);
    toggleModal({ modal: 'MediaModal' });
    sendAnalyticEvent(IMAGE_DETAIL_CLICKED, { eventId }).then().catch();
  }

  render() {
    const { caption, eventId, imageHeight, imageUrl, imageWidth } = this.props;
    const backgroundColorStyle = { backgroundColor: this.context.backgroundColor };

    return (
      <CardContainer>
        <View style={[styles.eventContainer, backgroundColorStyle]}>
          <Header eventId={eventId} overlay />
          <TouchableWithoutFeedback onPress={() => this.showMediaDetails()}>
            <View>
              <MediaImage
                height={imageHeight}
                imageUrl={imageUrl}
                width={imageWidth}
              />
            </View>
          </TouchableWithoutFeedback>
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
  setActiveEventId: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

ImageCard.contextTypes = {
  backgroundColor: PropTypes.string,
};
