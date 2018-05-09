import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native';
import { styles } from './style';

const SCALE_ANIMATION_DURATION = 200;

export default class CardContainer extends Component {
  constructor(props) {
    super(props);
    this.scaleValue = new Animated.Value(0);
  }

  onPress() {
    const { clickable, clickHandler } = this.props;
    if (clickable) {
      clickHandler();
    }

    this.grow();
  }

  onPressIn() {
    this.shrink();
  }

  onPressOut() {
    this.grow();
  }

  shrink() {
    this.scaleValue.setValue(0);
    Animated.timing(
      this.scaleValue,
      {
        toValue: 1,
        duration: SCALE_ANIMATION_DURATION,
        easing: Easing.easeOutBounce,
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
      }
    ).start();
  }

  render() {
    const { children } = this.props;
    const cardScaleStyles = {
      transform: [
        { scale: this.scaleValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 0.982, 0.964],
        }) },
      ],
    };

    return (
      <TouchableWithoutFeedback
        onPress={() => this.onPress()}
        onPressIn={() => this.onPressIn()}
        onPressOut={() => this.onPressOut()}
      >
        <Animated.View style={[styles.cardContainer, cardScaleStyles]}>
          {children}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

CardContainer.propTypes = {
  children: PropTypes.object.isRequired,
  clickable: PropTypes.bool,
  clickHandler: PropTypes.func,
};
