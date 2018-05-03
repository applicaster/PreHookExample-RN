import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
 } from 'react-native';
import { styles } from './style';
import HeartButton from './HeartButton';
import CommentButton from './CommentButton';

class InstagramActionButtons extends Component {
  render() {
    const { commentsCount, likesCount, eventId } = this.props;
    return (
      <View style={[styles.facebookActionButtons]}>
        <HeartButton key={'likes'} eventId={eventId} likesCount={likesCount} />
        <CommentButton key={'comments'} eventId={eventId} commentsCount={commentsCount} />
      </View>
    );
  }
}

InstagramActionButtons.propTypes = {
  eventId: PropTypes.string.isRequired,
  commentsCount: PropTypes.number.isRequired,
  likesCount: PropTypes.number.isRequired,
};

export default InstagramActionButtons;
