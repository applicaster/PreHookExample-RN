import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  TouchableOpacity,
} from 'react-native';
import { styles } from './style';

const WRITE_POST_BUTTON = 'feed_rn_write_post_button';
class WritePostButton extends Component {
  render() {
    const { mainColor } = this.context;
    const buttonTintColor = { tintColor: mainColor };

    return (
      <TouchableOpacity onPress={() => {}}>
        <Image style={[styles.writePostButton, buttonTintColor]} source={{ uri: WRITE_POST_BUTTON }} />
      </TouchableOpacity>
    );
  }
}

WritePostButton.contextTypes = {
  mainColor: PropTypes.string,
};

WritePostButton.propTypes = {
  navigateToWritePostScreen: PropTypes.func,
};

export default WritePostButton;
