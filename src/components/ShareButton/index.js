import {
  Image,
  StyleSheet,
  Share,
  TouchableOpacity,
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hexToRgb from 'hex-to-rgb';

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
    Share.share({
      message: 'Applicaster: We\'re helping you with awesome React Native apps',
      url: 'http://applicaster.com',
      title: 'Wow, did you see that?',
    }, {
      dialogTitle: 'Share BAM goodness',
    })
    .then(() => {
      console.log('share succeeded');
    })
    .catch(error => {
      console.log('share failed!');
      console.log(error);
    });
  }

  render() {
    const rgb = hexToRgb(this.context.textColor || '#FFFFFF');
    const rgbaColor = `rgba(${rgb[0]},${rgb[1]},${rgb[2]}, 0.60)`;
    const imageColor = { tintColor: rgbaColor };
    return (
      <TouchableOpacity onPress={this.share}>
        <Image
          style={[styles.shareButton, imageColor]}
          source={{ uri: 'share_button' }}
        />
      </TouchableOpacity>
    );
  }
}

ShareButton.contextTypes = {
  textColor: PropTypes.string,
};

export default ShareButton;
