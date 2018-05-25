import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing, TouchableWithoutFeedback } from 'react-native';
import { styles } from './style';

const SCALE_ANIMATION_DURATION = 200;

export default class CardContainer extends Component {
  constructor(props) {
    super(props);
    this.scaleValue = new Animated.Value(0);
    this.opacityValue = new Animated.Value(0);
  }

  componentWillMount() {
    Animated.timing(
      this.opacityValue,
      {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }
    ).start();
  }

  onPress() {
    const { clickable, clickHandler, isCardActive } = this.props;
    if (clickable) {
      clickHandler();
      // if (!isCardActive) this.grow();
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
    const { children } = this.props;
    const cardScaleStyles = {
      transform: [
        { scale: this.scaleValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.964],
        }) },
      ],
    };

    const cardOpacityStyles = { opacity: this.opacityValue };

    return (
      <TouchableWithoutFeedback
        onPress={() => this.onPress()}
        onPressIn={() => this.onPressIn()}
        onPressOut={() => this.onPressOut()}
      >
        <Animated.View style={[styles.cardContainer, cardScaleStyles, cardOpacityStyles]}>
          {children}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

CardContainer.propTypes = {
  children: PropTypes.object.isRequired,
  clickable: PropTypes.bool.isRequired,
  clickHandler: PropTypes.func,
  isCardActive: PropTypes.bool.isRequired,
};

CardContainer.defaultProps = {
  isCardActive: false,
  clickable: false,
};
