import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ActionButton from '../ActionButton';
import { COMMENT_BUTTON } from '../../icons';

class CommentButton extends Component {
  constructor(props) {
    super(props);
    this.navigateToComments = this.navigateToComments.bind(this);
  }

  navigateToComments() {
    const { navigation } = this.context;
    const { eventId, setActiveEventId } = this.props;

    setActiveEventId(eventId);

    if (navigation.state.routeName !== 'Comments') {
      navigation.navigate('Comments');
    }
  }
  
  render() {
    const { commentsCount } = this.props;
    return (
      <ActionButton
        imageUri={COMMENT_BUTTON}
        label={commentsCount}
        onPress={this.navigateToComments}
      />
    );
  }
}

CommentButton.propTypes = {
  eventId: PropTypes.string,
  commentsCount: PropTypes.func,
  setActiveEventId: PropTypes.func,
};

CommentButton.contextTypes = {
  navigation: PropTypes.object,
};

export default CommentButton;
