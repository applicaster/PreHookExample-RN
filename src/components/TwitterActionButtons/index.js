import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
 } from 'react-native';
import { styles } from './style';
import EventDetailCount from '../EventDetailCount';
import RetweetButton from '../RetweetButton';
import ReplyToTweetButton from '../ReplyToTweetButton';

class TwitterActionButtons extends Component {
  render() {
    const { favoriteCount, retweetCount, eventId } = this.props;
    return (
      <View style={[styles.twitterActionButtons]}>
        <ReplyToTweetButton key={'replyButton'} eventId={eventId} />
        <RetweetButton key={'retweetButton'} eventId={eventId} retweetCount={retweetCount} />
        <EventDetailCount key={'favorites'} eventId={eventId} count={favoriteCount} label={'Favorites'} />
      </View>
    );
  }
}

TwitterActionButtons.propTypes = {
  eventId: PropTypes.string,
  favoriteCount: PropTypes.number,
  retweetCount: PropTypes.number,
};

export default TwitterActionButtons;
