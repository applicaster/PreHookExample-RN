import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { styles } from './style';

const BACK_BUTTON = 'feed_rn_back_button';
class BackButton extends Component {
  render() {
    const { onPress } = this.props;
    const { textColor = '#FFFFFF' } = this.context.styles;
    const backButtonColor = { tintColor: `${textColor}99` };

    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <Image style={[styles.backButton, backButtonColor]} source={{ uri: BACK_BUTTON }} />
      </TouchableWithoutFeedback>
    );
  }
}

BackButton.propTypes = {
  onPress: PropTypes.func,
};

BackButton.contextTypes = {
  styles: PropTypes.object,
};

export default BackButton;
