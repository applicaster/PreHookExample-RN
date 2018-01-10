import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
 } from 'react-native';
import { styles } from './style';
import LikeButton from '../LikeButton';
import CommentButton from '../CommentButton';

class FacebookActionButtons extends Component {
  render() {
    const { commentsCount, likesCount, eventId } = this.props;
    return (
      <View style={[styles.facebookActionButtons]}>
        <LikeButton key={'likes'} eventId={eventId} likesCount={likesCount} />
        <CommentButton key={'comments'} eventId={eventId} commentsCount={commentsCount} socialNetwork={'Facebook'} />
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