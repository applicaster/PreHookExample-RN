import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import { Image } from 'react-native-animatable';
import { styles } from './style';

class ActionButton extends Component {
  render() {
    const { imageUri, label, onPress, selected } = this.props;
    const { mainColor = '#FFFFFF', textColor = '#FFFFFF' } = this.context;
    const tintColorStyle = { tintColor: (selected) ? mainColor : textColor };
    const textColorStyle = { color: `${textColor}99` };

    const ANIMATION_TYPE = 'rubberBand';
    const ANIMATION_DURATION = 0;
    const ANIMATION_DELAY = 400;
    return (
      <TouchableOpacity style={styles.actionButton} onPress={onPress}>
        <Image
          animation={ANIMATION_TYPE}
          delay={ANIMATION_DELAY}
          duration={ANIMATION_DURATION}
          source={{ uri: imageUri }}
          style={[styles.icon, tintColorStyle]}
        />
        <Text style={[styles.label, textColorStyle]} >{label}</Text>
      </TouchableOpacity>
    );
  }
}

ActionButton.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  imageUri: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

ActionButton.contextTypes = {
  mainColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default ActionButton;
