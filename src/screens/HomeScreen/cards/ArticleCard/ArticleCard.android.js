import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { sendAnalyticEvent } from 'react-native-zapp-bridge';
import { OPEN_ARTICLE_CARD } from '../../../../constants/analyticEvents';
import CardContainer from '../components/CardContainer';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MediaImage from '../components/MediaImage';
import MediaVideo from '../components/MediaVideo';
import { styles } from '../style';
import { styles as articleStyles } from './style';
import { BORDER_RADIUS, SCREEN_MARGIN } from '../../../../constants/measurements';

const TEXT_HORIZONTAL_PADDING = 13;
export default class ArticleCard extends Component {
  constructor(props) {
    super(props);

    this.cardContainer = null;
    this.activateCard = this.activateCard.bind(this);
  }

  getTitleColor() {
    const COLOR_CHANGE_TRESHHOLD = 0x999999;
    const { backgroundColor } = this.context.styles;
    const backgroundColorValue = parseInt(backgroundColor.substring(1), 16);
    if (backgroundColorValue < COLOR_CHANGE_TRESHHOLD) {
      return '#FFFFFF';
    }

    return '#000000';
  }

  activateCard() {
    const { setActiveEventId, eventId } = this.props;
    setActiveEventId(eventId);
    const { navigation } = this.context;
    sendAnalyticEvent(OPEN_ARTICLE_CARD, {}, this.context.platform === 'ios');
    navigation.navigate('ArticleScreen');
  }

  deActivateCard() {
    const { setNoActiveEvent } = this.props;
    setNoActiveEvent();
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

    return (
      <MediaImage
        height={imageHeight}
        imageUrl={imageUrl}
        width={imageWidth}
        isExpanded={false}
        isZoomed
      />
    );
  }

  renderHeader() {
    const { eventId } = this.props;
    return <Header eventId={eventId} overlay isEditorial />;
  }

  renderFooter() {
    const { eventId } = this.props;
    return <Footer eventId={eventId} />;
  }

  renderSummary() {
    const { summary } = this.props;

    const summaryStyles = {
      color: this.context.styles.textColor || '#FFFFFF',
      paddingHorizontal: TEXT_HORIZONTAL_PADDING,
    };

    return (
      <Text style={[articleStyles.summary, summaryStyles]}>{summary}</Text>
    );
  }

  renderCategoryAndTitle() {
    const { category, caption } = this.props;
    const textColorStyle = { color: this.context.styles.textColor || '#FFFFFF' };
    const titleColorStyle = { color: this.getTitleColor() };
    const categoryAndTitleContainerStyles = { paddingHorizontal: TEXT_HORIZONTAL_PADDING };

    return (
      <View style={categoryAndTitleContainerStyles}>
        <Text style={[articleStyles.category, textColorStyle]}>{category.toUpperCase()}</Text>
        <Text style={[articleStyles.title, titleColorStyle]}>{caption}</Text>
      </View>
    );
  }

  render() {
    const { backgroundColor, borderType } = this.context.styles;
    const backgroundColorStyle = { backgroundColor };

    const borderRadiusStyles = {
      borderRadius: BORDER_RADIUS(borderType),
    };

    const cardContainerStyles = Object.assign({
      marginHorizontal: SCREEN_MARGIN,
    }, borderRadiusStyles);

    return (
      <View ref={view => { this.cardContainer = view; }}>
        <CardContainer
          applyMargins={false}
          clickable
          clickHandler={this.activateCard}
        >
          <View style={[styles.eventContainer, backgroundColorStyle, cardContainerStyles]}>
            {this.renderHeader()}
            {this.renderMedia()}
            {this.renderCategoryAndTitle()}
            {this.renderSummary()}
            {this.renderFooter()}
          </View>
        </CardContainer>
      </View>);
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
  setNoActiveEvent: PropTypes.func.isRequired,
  summary: PropTypes.string.isRequired,
};

ArticleCard.contextTypes = {
  platform: PropTypes.string,
  styles: PropTypes.object,
  navigation: PropTypes.object,
};
