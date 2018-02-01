import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sendAnalyticEvent } from '@applicaster/react-native-zapp-bridge';
import { REPLY_TO_TWEET_CLICKED } from '../../constants/analyticEvents';
import ActionButton from '../ActionButton';
import { COMMENT_BUTTON } from '../../icons';

class ReplyToTweetButton extends Component {
  constructor(props) {
    super(props);
    this.reply = this.reply.bind(this);
  }

  reply() {
    const { eventId, setActiveEventId, toggleModal } = this.props;
    setActiveEventId(eventId);
    toggleModal({ modal: 'ReplyToTweetModal' });
    sendAnalyticEvent(REPLY_TO_TWEET_CLICKED, { eventId }).then().catch();
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
  toggleModal: PropTypes.func,
  setActiveEventId: PropTypes.func,
};

export default ReplyToTweetButton;
