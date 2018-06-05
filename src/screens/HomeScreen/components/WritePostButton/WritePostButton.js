import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
} from 'react-native';
import { Image } from 'react-native-animatable';
import { sendAnalyticEvent } from 'react-native-zapp-bridge';
import { WRITE_POST_BUTTON_CLICKED } from '../../../../constants/analyticEvents';
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
    const { mainColor, backgroundColor } = this.context;
    const { isCardActive, isFacebookAvailable, isSocialPostingEnabled, isTwitterAvailable } = this.props;
    if (isCardActive || !isSocialPostingEnabled || (!isFacebookAvailable && !isTwitterAvailable)) return null;
    
    const buttonTintColor = { tintColor: mainColor };
    const pencilTintColor = { tintColor: backgroundColor };

    const ANIMATION_TYPE = 'fadeInUp';
    const ANIMATION_DURATION = 400;
    const ANIMATION_DELAY = 650;
    return (
      <TouchableOpacity activeOpacity={0.85} style={styles.writePostButtonContainer} onPress={this.onPress}>
        <Image
          animation={ANIMATION_TYPE}
          delay={ANIMATION_DELAY}
          duration={ANIMATION_DURATION}
          source={{ uri: WRITE_POST_BUTTON }}
          style={[styles.writePostButton, buttonTintColor]}
        />
        <Image
          animation={ANIMATION_TYPE}
          delay={ANIMATION_DELAY}
          duration={ANIMATION_DURATION}
          source={{ uri: PENCIL_IMAGE }}
          style={[styles.writePostPencil, pencilTintColor]}
        />
      </TouchableOpacity>
    );
  }
}

WritePostButton.contextTypes = {
  mainColor: PropTypes.string,
  backgroundColor: PropTypes.string,
};

WritePostButton.propTypes = {
  isCardActive: PropTypes.bool.isRequired,
  isFacebookAvailable: PropTypes.bool.isRequired,
  isTwitterAvailable: PropTypes.bool.isRequired,
  isSocialPostingEnabled: PropTypes.bool.isRequired,
  openWritePostModal: PropTypes.func,
};

WritePostButton.defaultProps = {
  isCardActive: false,
  isFacebookAvailable: false,
  isTwitterAvailable: false,
  isSocialPostingEnabled: true,
};

export default WritePostButton;
