import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import CardContainer from '../components/CardContainer';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MediaVideo from '../components/MediaVideo';
import { styles } from '../style';
import { styles as videoStyles } from './style';
import { BORDER_RADIUS, SCREEN_MARGIN } from '../../../../constants/measurements';

const TEXT_HORIZONTAL_PADDING = 13;

export default class VideoCard extends Component {
  constructor(props) {
    super(props);
    this.state = { isCardActive: false };

    this.cardContainer = null;
    this.toggleCard = this.toggleCard.bind(this);
  }

  getTitleColor() {
    const COLOR_CHANGE_TRESHHOLD = 0x999999;
    const { backgroundColor } = this.context;
    const backgroundColorValue = parseInt(backgroundColor.substring(1), 16);
    if (backgroundColorValue < COLOR_CHANGE_TRESHHOLD) {
      return '#FFFFFF';
    }

    return '#000000';
  }

  toggleCard() {
    const { isCardActive } = this.state;
    const { setActiveEventId, setNoActiveEvent, eventId } = this.props;
    
    if (!isCardActive) {
      setActiveEventId(eventId);
    } else {
      setNoActiveEvent();
    }
    this.setState({ isCardActive: !isCardActive });
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
          isExpanded={false}
          isZoomed
        />
      );
    }

    return null;
  }

  renderHeader() {
    const { eventId } = this.props;
    return <Header eventId={eventId} overlay />;
  }
  
  renderFooter() {
    const { eventId } = this.props;
    return <Footer eventId={eventId} />;
  }

  renderCategoryAndTitle() {
    const { category, caption } = this.props;
    const textColorStyle = { color: this.context.textColor || '#FFFFFF' };
    const titleColorStyle = { color: this.getTitleColor() };
    const categoryAndTitleContainerStyles = { paddingHorizontal: TEXT_HORIZONTAL_PADDING };
    
    return (
      <View style={categoryAndTitleContainerStyles}>
        {category && <Text style={[videoStyles.category, textColorStyle]}>{category.toUpperCase()}</Text>}
        <Text style={[videoStyles.titleEditorial, titleColorStyle]}>{caption}</Text>
      </View>
    );
  }

  renderTitle() {
    const { caption } = this.props;
    const titleContainerStyles = {
      marginHorizontal: TEXT_HORIZONTAL_PADDING,
    };
    const titleTextColor = {
      color: this.context.textColor || '#FFFFFF',
    };

    return (
      <View style={titleContainerStyles}>
        <Text style={[videoStyles.title, titleTextColor]}>{caption}</Text>
      </View>
    );
  }

  render() {
    const { isEditorial } = this.props;

    const backgroundColorStyle = { backgroundColor: this.context.backgroundColor };

    const cardContainerStyles = {
      marginHorizontal: SCREEN_MARGIN,
      borderRadius: BORDER_RADIUS,
    };

    return (
      <View ref={view => { this.cardContainer = view; }}>
        <CardContainer
          applyMargins={false}
          clickable
          clickHandler={this.toggleCard}
        >
          <View style={[styles.eventContainer, backgroundColorStyle, cardContainerStyles]}>
            <View>
              {this.renderHeader()}
              {this.renderMedia()}
              {isEditorial ? this.renderCategoryAndTitle() : this.renderTitle()}
              {this.renderFooter()}
            </View>
          </View>
        </CardContainer>
      </View>);
  }
}

VideoCard.propTypes = {
  caption: PropTypes.string.isRequired,
  category: PropTypes.string,
  eventId: PropTypes.string.isRequired,
  imageHeight: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  imageWidth: PropTypes.number.isRequired,
  isEditorial: PropTypes.bool.isRequired,
  videoUrl: PropTypes.string,
  setActiveEventId: PropTypes.func.isRequired,
  setNoActiveEvent: PropTypes.func.isRequired,
};

VideoCard.contextTypes = {
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};
