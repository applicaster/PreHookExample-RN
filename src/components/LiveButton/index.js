import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
 } from 'react-native';

const buttonSize = 28;
const styles = StyleSheet.create({
  liveButton: {
    marginRight: 8,
    height: buttonSize,
    width: buttonSize,
  },
});

const LiveButton = ({}, { textColor }) => {
  const buttonTintColor = { tintColor: textColor };
  return (<TouchableOpacity>
    <Image style={[styles.liveButton, buttonTintColor]} source={{ uri: 'live_button' }} />
  </TouchableOpacity>);
};

LiveButton.contextTypes = {
  textColor: PropTypes.string,
};

export default LiveButton;
