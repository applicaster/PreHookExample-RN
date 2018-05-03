import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sendAnalyticEvent } from 'react-native-zapp-bridge';
import { COMMENT_CLICKED } from '../../../../../../constants/analyticEvents';
import ActionButton from '../../../ActionButton';
import { COMMENT_BUTTON } from '../../../../../../icons';

class CommentButton extends Component {
  constructor(props) {
    super(props);
    this.navigateToWebview = this.navigateToWebview.bind(this);
  }

  navigateToWebview() {
    const { navigation } = this.context;
    const { eventId, setActiveEventId } = this.props;

    setActiveEventId(eventId);
    navigation.navigate('SocialWebView', { headerTitle: 'Facebook' });
    sendAnalyticEvent(COMMENT_CLICKED, { eventId }).then().catch();
  }
  
  render() {
    const { commentsCount } = this.props;
    return (
      <ActionButton
        imageUri={COMMENT_BUTTON}
        label={commentsCount}
        onPress={this.navigateToWebview}
        selected={false}
      />
    );
  }
}

CommentButton.propTypes = {
  eventId: PropTypes.string.isRequired,
  commentsCount: PropTypes.number.isRequired,
  setActiveEventId: PropTypes.func.isRequired,
};

CommentButton.contextTypes = {
  navigation: PropTypes.object,
};

export default CommentButton;
