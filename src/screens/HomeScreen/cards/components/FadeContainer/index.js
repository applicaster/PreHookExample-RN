import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';

export default class FadeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
    };
    this.visibility = new Animated.Value(this.props.visible ? 1 : 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible) {
      this.setState({ visible: true });
    }
    Animated.timing(this.visibility, {
      toValue: nextProps.visible ? 1 : 0,
      duration: this.props.duration,
    }).start(() => {
      this.setState({ visible: nextProps.visible });
    });
  }

  render() {
    const { pressScale, style, children } = this.props;
    const { visible } = this.state;

    const containerStyle = {
      opacity: this.visibility.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    };

    if (pressScale !== 1) {
      containerStyle.transform = [
        {
          scale: this.visibility.interpolate({
            inputRange: [0, 1],
            outputRange: [pressScale, 1],
          }),
        },
      ];
    }

    const combinedStyle = [containerStyle, style];
    return (
      <Animated.View style={visible ? combinedStyle : containerStyle}>
        {visible ? children : null}
      </Animated.View>
    );
  }
}

FadeContainer.propTypes = {
  children: PropTypes.object.isRequired,
  duration: PropTypes.number,
  pressScale: PropTypes.number,
  style: PropTypes.object,
  visible: PropTypes.bool.isRequired,
};

FadeContainer.defaultProps = {
  duration: 500,
  pressScale: 1,
};
