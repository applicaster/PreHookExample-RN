import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ActionButton from '../ActionButton';
import { COMMENT_BUTTON } from '../../icons';

class ReplyToTweetButton extends Component {
  constructor(props) {
    super(props);
    this.reply = this.reply.bind(this);
  }

  reply() {
    const { eventId } = this.props;
    // navigate to reply screen
  }
  
  render() {
    return (
      <ActionButton
        imageUri={COMMENT_BUTTON}
        label={'Reply'}
        onPress={this.reply}
      />
    );
  }
}

ReplyToTweetButton.propTypes = {
  eventId: PropTypes.string,
};

export default ReplyToTweetButton;
