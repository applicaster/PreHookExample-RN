import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { styles } from './style';

const CLOSE_BUTTON = 'feed_rn_close_button';
class CloseButton extends Component {
  render() {
    const { onPress, isForModal } = this.props;
    const { textColor = '#FFFFFF' } = this.context;
    const closeButtonColor = { tintColor: `${textColor}99` };
    const isForModalStyles = (isForModal) ? styles.modalCloseButton : null;

    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <Image style={[styles.closeButton, isForModalStyles, closeButtonColor]} source={{ uri: CLOSE_BUTTON }} />
      </TouchableWithoutFeedback>
    );
  }
}

CloseButton.propTypes = {
  onPress: PropTypes.func,
  isForModal: PropTypes.bool,
};

CloseButton.contextTypes = {
  textColor: PropTypes.string,
};

export default CloseButton;
