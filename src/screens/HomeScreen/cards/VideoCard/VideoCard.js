import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Dimensions, LayoutAnimation, Text, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import ExpandText from '../components/ExpandText';
import CardContainer from '../components/CardContainer';
import FadeContainer from '../components/FadeContainer';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MediaVideo from '../components/MediaVideo';
import CloseButton from '../../../../buttons/CloseButton';
import { styles } from '../style';
import { styles as videoStyles } from './style';
import { BORDER_RADIUS, SCREEN_MARGIN, TOP_CARD_LIST_PADDING } from '../../../../constants/measurements';
import { CARD_ACTIVATE_ANIMATION_DURATION, CARD_DEACTIVATE_ANIMATION_DURATION } from '../../../../constants/animations';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const TEXT_HORIZONTAL_PADDING = 13;

export default class VideoCard extends Component {
  constructor(props) {
    super(props);
    this.state = { isCardActive: false };
    const { platform, navigationStyle } = props;

    this.cardContainer = null;
    this.cardHeight = 0;
    this.frameOffsetY = 0;
    this.toggleCard = this.toggleCard.bind(this);
    this.activateCardAnimationValue = new Animated.Value(1);
    this.transformCardAnimationValue = platform === 'ios' ? new Animated.Value(1) : null;
    this.opacityAnimationValue = new Animated.Value(1);

    if (navigationStyle === 'navbarWithTabbar') {
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
    const { setActiveEventId, setNoActiveEvent, eventId, index, platform } = this.props;

    this.cardContainer.measure((fx, fy, width, height, px, py) => {
      if (py < 0 || platform === 'android') {
        this.props.listRef.scrollToIndex({
          index,
          viewOffset: (platform === 'ios' || (platform === 'android' && isCardActive)) ? TOP_CARD_LIST_PADDING : 0,
          viewPosition: 0,
        });
      }

      this.cardContainer.measure((fx1, fy1, width1, height1, px1, py1) => {
        this.frameOffsetY = (py < 0) ? (TOP_CARD_LIST_PADDING) : Math.ceil(py1);
        this.cardHeight = height;

        const duration = this.getAnimationDuration();
        const animationConfig = Object.assign({ duration }, LayoutAnimation.Presets.easeInEaseOut);
        LayoutAnimation.configureNext(animationConfig);

        const animations = [
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
        ];

        if (platform === 'ios') {
          animations.push(Animated.spring(this.transformCardAnimationValue, {
            toValue: isCardActive ? 1 : 0,
            duration,
            friction: 5,
            tensions: 8,
            useNativeDriver: true,
          }));
        }

        Animated.parallel(animations).start();

        if (!isCardActive) {
          setActiveEventId(eventId);
        } else {
          setNoActiveEvent();
        }
        this.setState({ isCardActive: !isCardActive });
      });
    });
  }

  renderMedia() {
    const { isCardActive } = this.state;
    const { eventId, imageHeight, imageWidth, imageUrl, videoUrl } = this.props;
    if (videoUrl) {
      const mediaVideoContainerStyles = {
        marginTop: isCardActive ? '33%' : 0,
      };

      return (
        <View style={mediaVideoContainerStyles}>
          <MediaVideo
            eventId={eventId}
            height={imageHeight}
            imageUrl={imageUrl}
            videoUrl={videoUrl}
            width={imageWidth}
            isExpanded={isCardActive}
            isZoomed
          />
        </View>
      );
    }

    return null;
  }

  renderCloseButton() {
    const { isCardActive } = this.state;
    const duration = this.getAnimationDuration();

    return (
      <FadeContainer visible={isCardActive} style={videoStyles.closeButtonContainer} duration={duration}>
        <CloseButton onPress={this.toggleCard} style={videoStyles.closeButton} tintColor={'#FFFFFF'} />
      </FadeContainer>
    );
  }

  renderHeader() {
    const { eventId } = this.props;
    const { isCardActive } = this.state;
    const headerContainerStyles = { marginTop: isCardActive ? '33%' : 0 };

    return (
      <FadeContainer visible={!isCardActive} style={[videoStyles.headerContainer, headerContainerStyles]}>
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

  renderCategoryAndTitle() {
    const { category, caption } = this.props;
    const { isCardActive } = this.state;

    const textColorStyle = { color: this.context.styles.textColor || '#FFFFFF' };
    const titleColorStyle = { color: this.getTitleColor() };
    const categoryAndTitleContainerStyles = {
      opacity: this.opacityAnimationValue,
      marginHorizontal: (isCardActive)
        ? TEXT_HORIZONTAL_PADDING + SCREEN_MARGIN
        : TEXT_HORIZONTAL_PADDING,
      marginBottom: (isCardActive) ? 40 : 0,
    };

    return (
      <Animated.View style={categoryAndTitleContainerStyles}>
        {category && <Text style={[videoStyles.category, textColorStyle]}>{category.toUpperCase()}</Text>}
        <Text style={[videoStyles.titleEditorial, titleColorStyle]}>{caption}</Text>
      </Animated.View>
    );
  }

  renderTitle() {
    const { caption } = this.props;
    const { isCardActive } = this.state;

    const titleContainerStyles = {
      opacity: this.opacityAnimationValue,
      marginHorizontal: (isCardActive)
        ? TEXT_HORIZONTAL_PADDING + SCREEN_MARGIN
        : TEXT_HORIZONTAL_PADDING,
    };

    const titleTextColor = {
      color: this.context.styles.textColor || '#FFFFFF',
    };

    return (
      <Animated.View style={titleContainerStyles}>
        <ExpandText
          content={caption}
          textStyle={[videoStyles.title, titleTextColor]}
        />
      </Animated.View>
    );
  }

  render() {
    const { isCardActive } = this.state;
    const { isEditorial, platform } = this.props;

    const backgroundColorStyle = { backgroundColor: this.context.styles.backgroundColor };
    const cardContainerStyles = {
      borderRadius: (isCardActive) ? 0 : BORDER_RADIUS(),
      marginHorizontal: (isCardActive) ? 0 : SCREEN_MARGIN,
    };

    if (platform === 'ios') {
      cardContainerStyles.transform = [{
        translateY: this.transformCardAnimationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [-this.frameOffsetY + this.statusBarHeight, 0],
        }),
      }];
    }

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
            <View>
              {this.renderHeader()}
              {this.renderMedia()}
              {isEditorial ? this.renderCategoryAndTitle() : this.renderTitle()}
              {this.renderFooter()}
            </View>
          </Animated.View>
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
  index: PropTypes.number.isRequired,
  isEditorial: PropTypes.bool.isRequired,
  listRef: PropTypes.object.isRequired,
  navigationStyle: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
  videoUrl: PropTypes.string,
  setActiveEventId: PropTypes.func.isRequired,
  setNoActiveEvent: PropTypes.func.isRequired,
};

VideoCard.contextTypes = {
  styles: PropTypes.object,
};
