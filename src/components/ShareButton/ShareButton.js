import {
  Image,
  StyleSheet,
  Share,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const buttonSize = 30;
const styles = StyleSheet.create({
  shareButton: {
    width: buttonSize,
    height: buttonSize,
  },
});

class ShareButton extends Component {
  constructor(props) {
    super(props);
    this.share = this.share.bind(this);
  }

  share() {
    const {
      defaultMessage = '',
      message = '',
      url = 'http://its0n.tv/a/jb', // TODO: Fix this to be dynamic
      title = '',
    } = this.props;

    const textToShare = (Platform.OS === 'ios')
    ? `${defaultMessage} - ${message}`
    : `${defaultMessage} - ${message} ${url}`;

    Share.share({
      message: textToShare,
      title,
      url,
    })
    .then(() => {})
    .catch(() => {});
  }

  render() {
    const imageColor = { tintColor: `${this.context.textColor}99` };
    return (
      <TouchableOpacity onPress={this.share}>
        <Image
          style={[styles.shareButton, imageColor]}
          source={{ uri: 'feed_rn_share_button' }}
        />
      </TouchableOpacity>
    );
  }
}

ShareButton.propTypes = {
  defaultMessage: PropTypes.string,
  message: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string,
};

ShareButton.contextTypes = {
  textColor: PropTypes.string,
};

export default ShareButton;
