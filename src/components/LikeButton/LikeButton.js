import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ActionButton from '../ActionButton';
import { LIKE_BUTTON } from '../../icons';

class LikeButton extends Component {
  constructor(props) {
    super(props);
    this.navigateToWebview = this.navigateToWebview.bind(this);
  }

  navigateToWebview() {
    const { navigation } = this.context;
    const { eventId, setActiveEventId } = this.props;

    setActiveEventId(eventId);
    navigation.navigate('WebView', { headerTitle: 'Facebook' });
  }
  
  render() {
    const { likesCount } = this.props;
    return (
      <ActionButton
        imageUri={LIKE_BUTTON}
        label={likesCount}
        onPress={this.navigateToWebview}
      />
    );
  }
}

LikeButton.propTypes = {
  eventId: PropTypes.string,
  likesCount: PropTypes.number,
  setActiveEventId: PropTypes.func,
};

LikeButton.contextTypes = {
  navigation: PropTypes.object,
};

export default LikeButton;
