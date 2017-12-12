import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ActionButton from '../ActionButton';
import { COMMENT_BUTTON } from '../../icons';

class CommentButton extends Component {
  constructor(props) {
    super(props);
    this.navigateToWebview = this.navigateToWebview.bind(this);
  }

  navigateToWebview() {
    const { navigation } = this.context;
    const { eventId, setActiveEventId, socialNetwork } = this.props;

    setActiveEventId(eventId);
    navigation.navigate('WebView', { headerTitle: socialNetwork });
  }
  
  render() {
    const { commentsCount } = this.props;
    return (
      <ActionButton
        imageUri={COMMENT_BUTTON}
        label={commentsCount}
        onPress={this.navigateToWebview}
      />
    );
  }
}

CommentButton.propTypes = {
  eventId: PropTypes.string,
  commentsCount: PropTypes.number,
  setActiveEventId: PropTypes.func,
  socialNetwork: PropTypes.string,
};

CommentButton.contextTypes = {
  navigation: PropTypes.object,
};

export default CommentButton;
