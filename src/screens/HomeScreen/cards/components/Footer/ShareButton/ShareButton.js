import {
  Image,
  StyleSheet,
  Share,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sendAnalyticEvent } from 'react-native-zapp-bridge';
import {
  NATIVE_SHARE_CLICKED,
  NATIVE_EVENT_SHARED,
} from '../../../../../../constants/analyticEvents';

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
      publicPageUrl = '',
      title = '',
    } = this.props;

    const textToShare = (Platform.OS === 'ios')
    ? `${defaultMessage} - ${message}`
    : `${defaultMessage} - ${message} ${publicPageUrl}`;

    Share.share({
      message: textToShare,
      title,
      url: publicPageUrl,
    })
    .then(() => sendAnalyticEvent(NATIVE_EVENT_SHARED, { textToShare, publicPageUrl }).then().catch())
    .catch(() => {});
    sendAnalyticEvent(NATIVE_SHARE_CLICKED, { publicPageUrl }).then().catch();
  }

  render() {
    const { overlay } = this.props;
    const imageColor = { tintColor: (overlay)
    ? `${this.context.secondaryTextColor}99` || '#FFFFFF'
    : `${this.context.textColor}99` || '#FFFFFF' };
    
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
  defaultMessage: PropTypes.string.isRequired,
  message: PropTypes.string,
  overlay: PropTypes.bool.isRequired,
  publicPageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

ShareButton.defaultProps = {
  message: '',
};

ShareButton.contextTypes = {
  textColor: PropTypes.string,
  secondaryTextColor: PropTypes.string,
};

export default ShareButton;
