import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Dimensions, Text } from 'react-native';
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
import { BORDER_RADIUS, SCREEN_MARGIN } from '../../../../constants/measurements';
import { CARD_ACTIVATE_ANIMATION_DURATION } from '../../../../constants/animations';

const SCREEN_WIDTH = Dimensions.get('window').width;
const FULL_SCREEN_SCALE = SCREEN_WIDTH / (SCREEN_WIDTH - (SCREEN_MARGIN / 2));
const TEXT_HORIZONTAL_PADDING = 13;

export default class ArticleCard extends Component {
  constructor(props) {
    super(props);
    this.state = { isCardActive: false, articleContentHeight: 0 };

    this.activateCard = this.activateCard.bind(this);
    this.activateCardAnimationValue = new Animated.Value(1);
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

  activateCard() {
    const { isCardActive } = this.state;
    const { setActiveEventId, eventId } = this.props;
    setActiveEventId(eventId);
    
    this.setState({ isCardActive: !isCardActive });

    Animated.timing(this.activateCardAnimationValue, {
      toValue: isCardActive ? 1 : 0,
      duration: CARD_ACTIVATE_ANIMATION_DURATION,
    }).start();
    
    /*
      On Card Activate:
        - build article container to have:
          - DONE author
          - timestamp
          - DONE summary
          - DONE article body
    */
  }
  
  deActivateCard() {
    this.setState({ isCardActive: false });
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

  render() {
    const { isCardActive } = this.state;
    const { caption, category, eventId, summary } = this.props;
    const backgroundColorStyle = { backgroundColor: this.context.backgroundColor };
    const textColorStyle = { color: this.context.textColor || '#FFFFFF' };
    const titleColorStyle = { color: this.getTitleColor() };
    const fadeContainerStyles = { position: 'absolute', zIndex: 3 };
    const borderRadiusStyles = {
      borderRadius: this.activateCardAnimationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, BORDER_RADIUS],
      }),
    };

    const cardContainerStyles = Object.assign(borderRadiusStyles, {
      marginHorizontal: this.activateCardAnimationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-SCREEN_MARGIN, 0],
      }),
      transform: [
        { scale: this.activateCardAnimationValue.interpolate({
          inputRange: [0, 0.9, 1],
          outputRange: [FULL_SCREEN_SCALE, FULL_SCREEN_SCALE * 1.01, 1],
        }) },
      ],
    });
    
    const opacityStyles = {
      opacity: this.activateCardAnimationValue,
    };

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

    const summaryContainerStyles = {
      opacity: this.activateCardAnimationValue,
      paddingHorizontal: this.activateCardAnimationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [TEXT_HORIZONTAL_PADDING + SCREEN_MARGIN, TEXT_HORIZONTAL_PADDING],
      }),
    };

    return (
      <CardContainer clickable clickHandler={this.activateCard} styles={cardContainerStyles}>
        <Animated.View style={[styles.eventContainer, backgroundColorStyle, borderRadiusStyles]}>
          <FadeContainer visible={!isCardActive} style={fadeContainerStyles}>
            <Header eventId={eventId} overlay isEditorial />
          </FadeContainer>
          <FadeContainer visible={isCardActive} style={articleStyles.closeButton}>
            <CloseButton onPress={this.activateCard} style={articleStyles.closeButton} tintColor={'#FFFFFF'} />
          </FadeContainer>
          {this.renderMedia()}

          <Animated.View style={categoryAndTitleContainerStyles}>
            <Text style={[articleStyles.category, textColorStyle]}>{category.toUpperCase()}</Text>
            <Text style={[articleStyles.title, titleColorStyle]}>{caption}</Text>
          </Animated.View>
          
          {this.renderArticleContent()}
          
          <Animated.View style={summaryContainerStyles}>
            <Text style={[articleStyles.summary, textColorStyle]}>{summary}</Text>
          </Animated.View>
          
          <Animated.View style={opacityStyles}>
            <Footer eventId={eventId} />
          </Animated.View>
          
        </Animated.View>
      </CardContainer>);
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
  summary: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
};

ArticleCard.contextTypes = {
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};
