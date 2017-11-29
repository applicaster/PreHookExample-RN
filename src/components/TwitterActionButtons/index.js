import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
 } from 'react-native';
import { styles } from './style';
import EventDetailCount from '../EventDetailCount';
import RetweetButton from '../RetweetButton';

class TwitterActionButtons extends Component {
  render() {
    const { favoriteCount, replyCount, retweetCount, eventId } = this.props;
    return (
      <View style={[styles.twitterActionButtons]}>
        <EventDetailCount key={'favorites'} eventId={eventId} count={favoriteCount} label={'Favorites'} />
        <RetweetButton key={'retweetButton'} eventId={eventId} retweetCount={retweetCount} />
        <EventDetailCount key={'replies'} eventId={eventId} count={replyCount} label={'Replies'} />
      </View>
    );
  }
}

TwitterActionButtons.propTypes = {
  eventId: PropTypes.string,
  favoriteCount: PropTypes.number,
  replyCount: PropTypes.number,
  retweetCount: PropTypes.number,
};

export default TwitterActionButtons;
