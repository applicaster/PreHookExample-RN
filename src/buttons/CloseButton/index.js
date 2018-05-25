import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { styles } from './style';
import { CLOSE_ROUND_BUTTON } from '../../icons';

class CloseButton extends Component {
  render() {
    const { style: buttonContainerStyles, onPress, tintColor } = this.props;
    const { textColor = '#FFFFFF' } = this.context;
    const closeButtonColor = { tintColor: tintColor || `${textColor}99` };

    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={buttonContainerStyles}>
          <Image style={[styles.closeButton, closeButtonColor]} source={{ uri: CLOSE_ROUND_BUTTON }} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

CloseButton.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  tintColor: PropTypes.string,
};

CloseButton.contextTypes = {
  textColor: PropTypes.string,
};

export default CloseButton;
