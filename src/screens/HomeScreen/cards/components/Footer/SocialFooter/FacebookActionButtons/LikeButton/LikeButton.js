import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sendAnalyticEvent } from 'react-native-zapp-bridge';
import { FB_LIKE_CLICKED } from '../../../../../../../../constants/analyticEvents';
import ActionButton from '../../../ActionButton';
import { LIKE_BUTTON } from '../../../../../../../../icons';

class LikeButton extends Component {
  constructor(props) {
    super(props);
    this.navigateToWebview = this.navigateToWebview.bind(this);
  }

  navigateToWebview() {
    const { navigation } = this.context;
    const { eventId, setActiveEventId } = this.props;

    setActiveEventId(eventId);
    navigation.navigate('SocialWebView', { headerTitle: 'Facebook' });
    sendAnalyticEvent(FB_LIKE_CLICKED, { eventId }, this.context.platform === 'ios').then().catch();
  }
  
  render() {
    const { likesCount } = this.props;
    return (
      <ActionButton
        imageUri={LIKE_BUTTON}
        label={likesCount}
        onPress={this.navigateToWebview}
        selected={false}
      />
    );
  }
}

LikeButton.propTypes = {
  eventId: PropTypes.string.isRequired,
  likesCount: PropTypes.number.isRequired,
  setActiveEventId: PropTypes.func.isRequired,
};

LikeButton.contextTypes = {
  navigation: PropTypes.object,
  platform: PropTypes.string,
};

export default LikeButton;
