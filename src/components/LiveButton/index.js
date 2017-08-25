import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
 } from 'react-native';
import hexToRgb from 'hex-to-rgb';

const buttonSize = 28;
const styles = StyleSheet.create({
  liveButton: {
    marginRight: 8,
    height: buttonSize,
    width: buttonSize,
  },
});

const LIVE_BUTTON_ASSET = 'live_button';

class LiveButton extends Component {
  constructor(props) {
    super(props);
    this.openLiveVideo = this.openLiveVideo.bind(this);
  }
  
  getButtonColor() {
    const { isLive } = this.props;
    const { textColor, mainColor } = this.context;
    const rgb = hexToRgb(textColor || '#FFFFFF');
    const offlineColor = `rgba(${rgb[0]},${rgb[1]},${rgb[2]}, 0.60)`;
    return isLive ? { tintColor: mainColor } : { tintColor: offlineColor };
  }

  openLiveVideo() {
    const { liveUrl } = this.props;
    Linking.openURL(liveUrl).catch(err => console.error('Unable to open live video', err));
  }
  
  renderActiveState() {
    const buttonColor = this.getButtonColor();
    return (<TouchableOpacity onPress={this.openLiveVideo}>
      <Image style={[styles.liveButton, buttonColor]} source={{ uri: LIVE_BUTTON_ASSET }} />
    </TouchableOpacity>);
  }

  renderInactiveState() {
    const buttonColor = this.getButtonColor();
    return <Image style={[styles.liveButton, buttonColor]} source={{ uri: LIVE_BUTTON_ASSET }} />;
  }

  render() {
    const { isLive } = this.props;
    return isLive ? this.renderActiveState() : this.renderInactiveState();
  }
}

LiveButton.propTypes = {
  isLive: PropTypes.bool,
  liveUrl: PropTypes.string,
};

LiveButton.contextTypes = {
  textColor: PropTypes.string,
  mainColor: PropTypes.string,
};

export default LiveButton;
