import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './style';

const WRITE_POST_BUTTON = 'feed_rn_write_post_button';
const PENCIL_IMAGE = 'feed_rn_pencil';

class WritePostButton extends Component {
  render() {
    const { mainColor } = this.context;
    const { openWritePostModal } = this.props;
    const buttonTintColor = { tintColor: mainColor };

    return (
      <TouchableOpacity onPress={() => openWritePostModal({ modal: 'WritePostModal' })}>
        <View style={styles.writePostButtonContainer}>
          <Image style={[styles.writePostButton, buttonTintColor]} source={{ uri: WRITE_POST_BUTTON }} />
          <Image style={[styles.writePostPencil]} source={{ uri: PENCIL_IMAGE }} />
        </View>
      </TouchableOpacity>
    );
  }
}

WritePostButton.contextTypes = {
  mainColor: PropTypes.string,
};

WritePostButton.propTypes = {
  openWritePostModal: PropTypes.func,
};

export default WritePostButton;
