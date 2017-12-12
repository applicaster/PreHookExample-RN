import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { styles } from './style';

class ActionButton extends Component {
  render() {
    const { imageUri, label, onPress, selected } = this.props;
    const { mainColor = '#FFFFFF', textColor = '#FFFFFF' } = this.context;
    const tintColorStyle = { tintColor: (selected) ? mainColor : textColor };
    const textColorStyle = { color: `${textColor}99` };

    return (
      <TouchableOpacity style={styles.actionButton} onPress={onPress}>
        <Image source={{ uri: imageUri }} style={[styles.icon, tintColorStyle]} />
        <Text style={[styles.label, textColorStyle]} >{label}</Text>
      </TouchableOpacity>
    );
  }
}

ActionButton.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  imageUri: PropTypes.string,
  onPress: PropTypes.func,
  selected: PropTypes.bool,
};

ActionButton.contextTypes = {
  mainColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default ActionButton;
