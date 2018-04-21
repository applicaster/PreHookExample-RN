import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import ShareButton from '../ShareButton';
import { styles } from './style';

class EventActionBar extends Component {
  renderShareButton() {
    const { overlay } = this.props;
    return (<View style={styles.shareButtonContainer}>
      <ShareButton overlay={overlay} message={this.props.textToShare} />
    </View>);
  }

  render() {
    const { caption, overlay } = this.props;
    const captionColorStyle = { color: this.context.secondaryTextColor };

    return (<View style={[styles.actionBar, overlay && styles.overlayBar]}>
      {caption && <Text numberOfLines={2} style={[styles.caption, captionColorStyle]}>{caption}</Text>}
      {this.renderShareButton()}
    </View>);
  }
}

EventActionBar.propTypes = {
  caption: PropTypes.string,
  overlay: PropTypes.bool,
  source: PropTypes.string,
  textToShare: PropTypes.string,
};

EventActionBar.contextTypes = {
  secondaryTextColor: PropTypes.string,
  navigation: PropTypes.object,
};

export default EventActionBar;
