import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
 } from 'react-native';
import { styles } from './style';
import EventDetailCount from '../EventDetailCount';
import CommentButton from '../CommentButton';

class FacebookActionButtons extends Component {
  render() {
    const { commentsCount, likesCount, eventId } = this.props;
    return (
      <View style={[styles.facebookActionButtons]}>
        <EventDetailCount key={'likes'} eventId={eventId} count={likesCount} label={'Likes'} />
        <CommentButton key={'comments'} eventId={eventId} commentsCount={commentsCount} />
      </View>
    );
  }
}

FacebookActionButtons.propTypes = {
  eventId: PropTypes.string,
  commentsCount: PropTypes.number,
  likesCount: PropTypes.number,
};

export default FacebookActionButtons;
