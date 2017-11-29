import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './style';

class ActionButton extends Component {
  render() {
    const { imageUri, label, onPress } = this.props;
    const { textColor = '#FFFFFF' } = this.context;
    const tintColorStyle = { tintColor: textColor };
    const textColorStyle = { color: `${textColor}99` };

    return (
      <View style={styles.actionButton}>
        <TouchableOpacity onPress={onPress}>
          <Image source={{ uri: imageUri }} style={[styles.icon, tintColorStyle]} />
        </TouchableOpacity>
        <Text style={[styles.label, textColorStyle]} >{label}</Text>
      </View>
    );
  }
}

ActionButton.propTypes = {
  label: PropTypes.number,
  imageUri: PropTypes.string,
  onPress: PropTypes.func,
};

ActionButton.contextTypes = {
  textColor: PropTypes.string,
};

export default ActionButton;
