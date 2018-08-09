import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Dimensions, LayoutAnimation, ScrollView, Text, View } from 'react-native';
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
import {
  BORDER_RADIUS,
  SCREEN_MARGIN,
  TOP_CARD_LIST_PADDING,
} from '../../../../constants/measurements';
import { CARD_ACTIVATE_ANIMATION_DURATION, CARD_DEACTIVATE_ANIMATION_DURATION } from '../../../../constants/animations';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const TEXT_HORIZONTAL_PADDING = 13;

export default class ArticleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCardActive: false,
    };

    this.cardContainer = null;
    this.cardHeight = 0;
    this.frameOffsetY = 0;
    this.statusBarHeight = 0;
    this.toggleCard = this.toggleCard.bind(this);
    this.activateCardAnimationValue = new Animated.Value(1);
    this.transformCardAnimationValue = new Animated.Value(1);
    this.opacityAnimationValue = new Animated.Value(1);
    
    if (props.navigationStyle === 'navbarWithTabbar') {
      this.statusBarHeight = 0;
    } else {
      this.statusBarHeight = getStatusBarHeight();
    }
  }

  getAnimationDuration() {
    const { isCardActive } = this.state;
    return (isCardActive) ? CARD_DEACTIVATE_ANIMATION_DURATION : CARD_ACTIVATE_ANIMATION_DURATION;
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

  toggleCard() {
    const { isCardActive } = this.state;
    const { setActiveEventId, setNoActiveEvent, eventId, index } = this.props;

    this.cardContainer.measure((fx, fy, width, height, px, py) => {
      if (py < 0) {
        this.props.listRef.scrollToIndex({
          index,
          viewOffset: TOP_CARD_LIST_PADDING,
          viewPosition: 0,
        });
      }

      this.cardContainer.measure((fx1, fy1, width1, height1, px1, py1) => {
        this.frameOffsetY = (py < 0) ? (TOP_CARD_LIST_PADDING) : Math.ceil(py1);
        this.cardHeight = height;
  
        const duration = this.getAnimationDuration();
        const animationConfig = Object.assign({ duration }, LayoutAnimation.Presets.easeInEaseOut);
        LayoutAnimation.configureNext(animationConfig);
  
        Animated.parallel([
          Animated.timing(this.activateCardAnimationValue, {
            toValue: isCardActive ? 1 : 0,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(this.opacityAnimationValue, {
            toValue: isCardActive ? 1 : 0,
            duration,
            useNativeDriver: true,
          }),
          Animated.spring(this.transformCardAnimationValue, {
            toValue: isCardActive ? 1 : 0,
            duration,
            friction: 5,
            tensions: 8,
            useNativeDriver: true,
          }),
        ]).start();
  
        if (!isCardActive) {
          setActiveEventId(eventId);
        } else {
          setNoActiveEvent();
        }
        this.setState({ isCardActive: !isCardActive });
      });
    });
  }

  renderArticleContent() {
    const { author, body, summary, timestamp } = this.props;
    const { isCardActive } = this.state;

    return (
      <ArticleContent
        author={author}
        animationValue={this.activateCardAnimationValue}
        body={body}
        isPresented={isCardActive}
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
        />);
    }

    return (
      <MediaImage
        height={imageHeight}
        imageUrl={imageUrl}
        width={imageWidth}
        isExpanded={isCardActive}
        isZoomed
      />);
  }

  renderCloseButton() {
    const { isCardActive } = this.state;
    const duration = this.getAnimationDuration();

    return (
      <FadeContainer visible={isCardActive} style={articleStyles.closeButtonContainer} duration={duration}>
        <CloseButton onPress={this.toggleCard} style={articleStyles.closeButton} tintColor={'#FFFFFF'} />
      </FadeContainer>
    );
  }

  renderHeader() {
    const { eventId } = this.props;
    const { isCardActive } = this.state;

    return (
      <FadeContainer visible={!isCardActive} style={articleStyles.headerContainer}>
        <Header eventId={eventId} overlay />
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
    const { isCardActive } = this.state;

    const summaryContainerStyles = {
      opacity: this.opacityAnimationValue,
      marginHorizontal: (isCardActive)
        ? TEXT_HORIZONTAL_PADDING + SCREEN_MARGIN
        : TEXT_HORIZONTAL_PADDING,
    };

    const summaryTextColor = {
      color: this.context.styles.textColor || '#FFFFFF',
    };

    return (
      <Animated.View style={summaryContainerStyles}>
        <Text style={[articleStyles.summary, summaryTextColor]}>{summary}</Text>
      </Animated.View>
    );
  }

  renderCategoryAndTitle() {
    const { category, caption } = this.props;
    const { isCardActive } = this.state;

    const textColorStyle = { color: this.context.styles.textColor || '#FFFFFF' };
    const titleColorStyle = { color: this.getTitleColor() };
    const categoryAndTitleContainerStyles = {
      marginHorizontal: (isCardActive)
        ? TEXT_HORIZONTAL_PADDING + SCREEN_MARGIN
        : TEXT_HORIZONTAL_PADDING,
      marginBottom: (isCardActive) ? 40 : 0,
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
    const backgroundColorStyle = { backgroundColor: this.context.styles.backgroundColor };

    const borderRadiusStyles = {
      borderRadius: (isCardActive) ? 0 : BORDER_RADIUS(),
    };

    const cardContainerStyles = Object.assign({
      marginHorizontal: (isCardActive) ? 0 : SCREEN_MARGIN,
      transform: [
        {
          translateY: this.transformCardAnimationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [-this.frameOffsetY + this.statusBarHeight, 0],
          }),
        },
      ],
    }, borderRadiusStyles);


    if (isCardActive) {
      cardContainerStyles.height = (isCardActive) ? WINDOW_HEIGHT : this.cardHeight;
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
  index: PropTypes.number.isRequired,
  listRef: PropTypes.object.isRequired,
  navigationStyle: PropTypes.string.isRequired,
  videoUrl: PropTypes.string,
  setActiveEventId: PropTypes.func.isRequired,
  setNoActiveEvent: PropTypes.func.isRequired,
  summary: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
};

ArticleCard.contextTypes = {
  styles: PropTypes.object,
};
