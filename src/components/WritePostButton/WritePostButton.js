import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  TouchableOpacity,
} from 'react-native';
import { styles } from './style';

const WRITE_POST_BUTTON = 'feed_rn_write_post_button';
const PENCIL_IMAGE = 'feed_rn_pencil';

class WritePostButton extends Component {
  render() {
    const { mainColor, textColor } = this.context;
    const { openWritePostModal } = this.props;
    const buttonTintColor = { tintColor: mainColor };
    const pencilTintColor = { tintColor: textColor };

    return (
      <TouchableOpacity style={styles.writePostButtonContainer} onPress={() => openWritePostModal({ modal: 'WritePostModal' })}>
        <Image style={[styles.writePostButton, buttonTintColor]} source={{ uri: WRITE_POST_BUTTON }} />
        <Image style={[styles.writePostPencil, pencilTintColor]} source={{ uri: PENCIL_IMAGE }} />
      </TouchableOpacity>
    );
  }
}

WritePostButton.contextTypes = {
  mainColor: PropTypes.string,
  textColor: PropTypes.string,
};

WritePostButton.propTypes = {
  openWritePostModal: PropTypes.func,
};

export default WritePostButton;
