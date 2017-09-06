import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
 } from 'react-native';
import EventDetailCount from '../EventDetailCount';
import ShareButton from '../ShareButton';

const styles = StyleSheet.create({
  buttonBar: {
    flexDirection: 'row',
    height: 30,
    paddingHorizontal: 7,
    paddingBottom: 10,
  },
  instagramBar: {
    marginLeft: 3,
  },
  shareButtonContainer: {
    position: 'absolute',
    right: 7,
    bottom: 10,
  },
});

class ActionBar extends Component {
  renderShareButton() {
    return (<View style={styles.shareButtonContainer}>
      <ShareButton message={this.props.textToShare} />
    </View>);
  }
  
  renderInstagramBar() {
    const { likesCount, commentsCount, eventId } = this.props;
    return (
      <View style={[styles.buttonBar, styles.instagramBar]}>
        <EventDetailCount key={'likes'} eventId={eventId} count={likesCount} label={'Likes'} />
        <EventDetailCount key={'comments'} eventId={eventId} count={commentsCount} label={'Comments'} />
        {this.renderShareButton()}
      </View>
    );
  }

  render() {
    let actionBar;
    switch (this.props.socialNetwork) {
      case 'instagram':
      case 'facebook':
      case 'twitter':
        actionBar = this.renderInstagramBar();
        break;
      default:
        actionBar = null;
        break;
    }
    return actionBar;
  }
}

ActionBar.propTypes = {
  eventId: PropTypes.string,
  socialNetwork: PropTypes.string,
  likesCount: PropTypes.number,
  commentsCount: PropTypes.number,
  textToShare: PropTypes.string,
};

ActionBar.contextTypes = {
  navigation: PropTypes.object,
};

export default ActionBar;
