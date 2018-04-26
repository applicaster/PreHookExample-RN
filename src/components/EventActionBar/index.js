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

  renderCaption() {
    const { caption, overlay } = this.props;
    const captionColorStyle = { color: this.context.secondaryTextColor };
    if (caption && overlay) {
      return <Text ellipsizeMode={'tail'} numberOfLines={2} style={[styles.caption, captionColorStyle]}>{caption}</Text>;
    }
    
    return null;
  }

  render() {
    const { caption, overlay } = this.props;
    const justifyStyles = { justifyContent: (caption && overlay) ? 'space-between' : 'flex-end' };
    return (<View style={[styles.actionBar, justifyStyles, overlay && styles.overlayBar]}>
      {this.renderCaption()}
      {this.renderShareButton()}
    </View>);
  }
}

EventActionBar.propTypes = {
  caption: PropTypes.string,
  overlay: PropTypes.bool,
  textToShare: PropTypes.string,
};

EventActionBar.contextTypes = {
  secondaryTextColor: PropTypes.string,
};

export default EventActionBar;
