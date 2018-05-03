import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
 } from 'react-native';
import { styles } from './style';
import RetweetButton from './RetweetButton';
import ReplyToTweetButton from './ReplyToTweetButton';
import FavoriteTweetButton from './FavoriteTweetButton';

class TwitterActionButtons extends Component {
  render() {
    const { favoriteCount, retweetCount, eventId } = this.props;
    return (
      <View style={[styles.twitterActionButtons]}>
        <ReplyToTweetButton key={'replyButton'} eventId={eventId} />
        <RetweetButton key={'retweetButton'} eventId={eventId} retweetCount={retweetCount} />
        <FavoriteTweetButton key={'favoriteTweetButton'} eventId={eventId} favoriteCount={favoriteCount} />
      </View>
    );
  }
}

TwitterActionButtons.propTypes = {
  eventId: PropTypes.string.isRequired,
  favoriteCount: PropTypes.number.isRequired,
  retweetCount: PropTypes.number.isRequired,
};

export default TwitterActionButtons;
