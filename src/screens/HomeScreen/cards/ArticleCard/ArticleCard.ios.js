import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Dimensions, ScrollView, Text, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import CardContainer from '../components/CardContainer';
import FadeContainer from '../components/FadeContainer';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MediaImage from '../components/MediaImage';
import MediaVideo from '../components/MediaVideo';
import ArticleContent from './ArticleContent';
import CloseButton from '../../../../buttons/CloseButton';
import { styles } from '../style';
import { styles as articleStyles } from './style';
import { BORDER_RADIUS, SCREEN_MARGIN, TOP_CARD_LIST_PADDING } from '../../../../constants/measurements';
import { CARD_ACTIVATE_ANIMATION_DURATION, CARD_DEACTIVATE_ANIMATION_DURATION } from '../../../../constants/animations';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;
const FULL_SCREEN_SCALE = WINDOW_WIDTH / (WINDOW_WIDTH - (SCREEN_MARGIN / 2));
const TEXT_HORIZONTAL_PADDING = 13;
const STATUS_BAR_HEIGHT = getStatusBarHeight();

export default class ArticleCard extends Component {
  constructor(props) {
    super(props);
    this.state = { isCardActive: false };

    this.cardContainer = null;
    this.cardHeight = 0;
    this.frameOffsetY = 0;
    this.toggleCard = this.toggleCard.bind(this);
    this.activateCardAnimationValue = new Animated.Value(1);
    this.transformCardAnimationValue = new Animated.Value(1);
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
    
    this.cardContainer.measure((fx, fy, width, height, px, py) => {
      this.frameOffsetY = py;
      this.cardHeight = height;

      Animated.parallel([
        Animated.timing(this.activateCardAnimationValue, {
          toValue: isCardActive ? 1 : 0,
          duration: (isCardActive) ? CARD_DEACTIVATE_ANIMATION_DURATION : CARD_ACTIVATE_ANIMATION_DURATION,
        }),
        Animated.spring(this.transformCardAnimationValue, {
          toValue: isCardActive ? 1 : 0,
          duration: (isCardActive) ? CARD_DEACTIVATE_ANIMATION_DURATION : CARD_ACTIVATE_ANIMATION_DURATION,
          friction: 5,
          tensions: 8,
        }),
      ]).start();
      
      this.setState({ isCardActive: !isCardActive });
    });
  }
  
  renderArticleContent() {
    const { author, body, summary, timestamp } = this.props;
    
    return (
      <ArticleContent
        author={author}
        animationValue={this.activateCardAnimationValue}
        body={body}
        summary={summary}
        timestamp={timestamp}
      />
    );
  }

  renderMedia() {
    const { isCardActive } = this.state;
    const { eventId, imageHeight, imageWidth, imageUrl, videoUrl } = this.props;
    if (videoUrl) {
      return (
        <MediaVideo
          eventId={eventId}
          height={imageHeight}
          imageUrl={imageUrl}
          videoUrl={videoUrl}
          width={imageWidth}
          isExpanded={isCardActive}
          isZoomed
        />
      );
    }

    return (
      <MediaImage
        height={imageHeight}
        imageUrl={imageUrl}
        width={imageWidth}
        isExpanded={isCardActive}
        isZoomed
      />
    );
  }

  renderCloseButton() {
    const { isCardActive } = this.state;
    return (
      <FadeContainer visible={isCardActive} style={articleStyles.closeButtonContainer}>
        <CloseButton onPress={this.toggleCard} style={articleStyles.closeButton} tintColor={'#FFFFFF'} />
      </FadeContainer>
    );
  }

  renderHeader() {
    const { eventId } = this.props;
    const { isCardActive } = this.state;

    return (
      <FadeContainer visible={!isCardActive} style={articleStyles.headerContainer}>
        <Header eventId={eventId} overlay isEditorial />
      </FadeContainer>
    );
  }
  
  renderFooter() {
    const { eventId } = this.props;
    const footerStyles = {
      opacity: this.activateCardAnimationValue,
    };

    return (
      <Animated.View style={footerStyles}>
        <Footer eventId={eventId} />
      </Animated.View>
    );
  }

  renderSummary() {
    const { summary } = this.props;
    
    const summaryContainerStyles = {
      opacity: this.activateCardAnimationValue,
      paddingHorizontal: this.activateCardAnimationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [TEXT_HORIZONTAL_PADDING + SCREEN_MARGIN, TEXT_HORIZONTAL_PADDING],
      }),
    };

    const summaryTextColor = {
      color: this.context.textColor || '#FFFFFF',
    };

    return (
      <Animated.View style={summaryContainerStyles}>
        <Text style={[articleStyles.summary, summaryTextColor]}>{summary}</Text>
      </Animated.View>
    );
  }

  renderCategoryAndTitle() {
    const { category, caption } = this.props;
    const textColorStyle = { color: this.context.textColor || '#FFFFFF' };
    const titleColorStyle = { color: this.getTitleColor() };
    const categoryAndTitleContainerStyles = {
      paddingHorizontal: this.activateCardAnimationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [TEXT_HORIZONTAL_PADDING + SCREEN_MARGIN, TEXT_HORIZONTAL_PADDING],
      }),
      marginBottom: this.activateCardAnimationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [40, 0],
      }),
    };
    
    return (
      <Animated.View style={categoryAndTitleContainerStyles}>
        <Text style={[articleStyles.category, textColorStyle]}>{category.toUpperCase()}</Text>
        <Text style={[articleStyles.title, titleColorStyle]}>{caption}</Text>
      </Animated.View>
    );
  }

  render() {
    const { isCardActive } = this.state;
    const backgroundColorStyle = { backgroundColor: this.context.backgroundColor };
    
    const borderRadiusStyles = {
      borderRadius: this.activateCardAnimationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, BORDER_RADIUS],
      }),
    };

    const cardContainerStyles = Object.assign({
      marginHorizontal: this.activateCardAnimationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, SCREEN_MARGIN],
      }),
      transform: [
        { scale: this.activateCardAnimationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [FULL_SCREEN_SCALE, 1],
        }) },
      ],
    }, borderRadiusStyles);

    const SCROLLING_CARD_Y_OFFSET = (0.02248 * (this.frameOffsetY - STATUS_BAR_HEIGHT - TOP_CARD_LIST_PADDING));
    cardContainerStyles.transform.push(
      { translateY: this.transformCardAnimationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-this.frameOffsetY + (STATUS_BAR_HEIGHT + (TOP_CARD_LIST_PADDING / 2) + SCROLLING_CARD_Y_OFFSET), 0],
      }) });

    if (isCardActive) {
      cardContainerStyles.height = this.activateCardAnimationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [WINDOW_HEIGHT, this.cardHeight],
      });
    }

    return (
      <View ref={view => { this.cardContainer = view; }}>
        <CardContainer
          applyMargins={false}
          clickable
          clickHandler={this.toggleCard}
          isCardActive={isCardActive}
        >
          <Animated.View style={[styles.eventContainer, backgroundColorStyle, cardContainerStyles]}>
            {this.renderCloseButton()}
            <ScrollView>
              <View onStartShouldSetResponder={() => isCardActive}>
                {this.renderHeader()}
                {this.renderMedia()}
                {this.renderCategoryAndTitle()}
                {this.renderArticleContent()}
                {this.renderSummary()}
                {this.renderFooter()}
              </View>
            </ScrollView>
          </Animated.View>
        </CardContainer>
      </View>);
  }
}

ArticleCard.propTypes = {
  author: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
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
  timestamp: PropTypes.number.isRequired,
};

ArticleCard.contextTypes = {
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};
