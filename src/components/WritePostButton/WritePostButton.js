import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
} from 'react-native';
import { Image } from 'react-native-animatable';
import { sendAnalyticEvent } from 'react-native-zapp-bridge';
import { WRITE_POST_BUTTON_CLICKED } from '../../constants/analyticEvents';
import { styles } from './style';

const WRITE_POST_BUTTON = 'feed_rn_write_post_button';
const PENCIL_IMAGE = 'feed_rn_pencil';

class WritePostButton extends Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    const { openWritePostModal } = this.props;
    
    openWritePostModal({ modal: 'WritePostModal' });
    sendAnalyticEvent(WRITE_POST_BUTTON_CLICKED, {}).then().catch();
  }

  render() {
    const { mainColor, textColor } = this.context;
    const buttonTintColor = { tintColor: mainColor };
    const pencilTintColor = { tintColor: textColor };

    const ANIMATION_TYPE = 'fadeInUp';
    const ANIMATION_DURATION = 400;
    const ANIMATION_DELAY = 650;
    return (
      <TouchableOpacity activeOpacity={0.85} style={styles.writePostButtonContainer} onPress={this.onPress}>
        <Image style={[styles.writePostButton, buttonTintColor]} source={{ uri: WRITE_POST_BUTTON }} animation={ANIMATION_TYPE} delay={ANIMATION_DELAY} duration={ANIMATION_DURATION} />
        <Image style={[styles.writePostPencil, pencilTintColor]} source={{ uri: PENCIL_IMAGE }} animation={ANIMATION_TYPE} delay={ANIMATION_DELAY} duration={ANIMATION_DURATION} />
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
