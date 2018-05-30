import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing, TouchableWithoutFeedback } from 'react-native';
import { SCREEN_MARGIN } from '../../../../../constants/measurements';
import { styles } from './style';

const SCALE_ANIMATION_DURATION = 200;
const FADE_IN_ANIMATION_DURATION = 450;

export default class CardContainer extends Component {
  constructor(props) {
    super(props);
    this.scaleValue = new Animated.Value(0);
    this.opacityValue = new Animated.Value(0);
  }
  
  componentDidMount() {
    Animated.timing(
      this.opacityValue,
      {
        toValue: 1,
        duration: FADE_IN_ANIMATION_DURATION,
        useNativeDriver: true,
      }
    ).start();
  }

  onPress() {
    const { clickable, clickHandler } = this.props;
    if (clickable) {
      clickHandler();
    }
  }

  onPressIn() {
    const { clickable, isCardActive } = this.props;
    if (clickable && !isCardActive) this.shrink();
  }

  onPressOut() {
    const { clickable, isCardActive } = this.props;
    if (clickable && !isCardActive) this.grow();
  }

  shrink() {
    this.scaleValue.setValue(0);
    Animated.timing(
      this.scaleValue,
      {
        toValue: 1,
        duration: SCALE_ANIMATION_DURATION,
        easing: Easing.easeOutBounce,
        useNativeDriver: true,
      }
    ).start();
  }

  grow() {
    this.scaleValue.setValue(1);
    Animated.timing(
      this.scaleValue,
      {
        toValue: 0,
        duration: SCALE_ANIMATION_DURATION,
        easing: Easing.easeOutBounce,
        useNativeDriver: true,
      }
    ).start();
  }

  render() {
    const { applyMargins, children } = this.props;

    const cardScaleStyles = {
      transform: [
        { scale: this.scaleValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.964],
        }) },
      ],
    };

    const cardOpacityStyles = { opacity: this.opacityValue };
    const marginHorizontalStyles = { marginHorizontal: SCREEN_MARGIN };

    return (
      <TouchableWithoutFeedback
        onPress={() => this.onPress()}
        onPressIn={() => this.onPressIn()}
        onPressOut={() => this.onPressOut()}
      >
        <Animated.View style={[styles.cardContainer, cardScaleStyles, cardOpacityStyles, applyMargins && marginHorizontalStyles]}>
          {children}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

CardContainer.propTypes = {
  applyMargins: PropTypes.bool.isRequired,
  children: PropTypes.object.isRequired,
  clickable: PropTypes.bool.isRequired,
  clickHandler: PropTypes.func,
  isCardActive: PropTypes.bool.isRequired,
};

CardContainer.defaultProps = {
  isCardActive: false,
  clickable: false,
  applyMargins: true,
};
