import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ActionButton from '../ActionButton';
import { HEART_BUTTON } from '../../icons';

class HeartButton extends Component {
  constructor(props) {
    super(props);
    this.navigateToWebview = this.navigateToWebview.bind(this);
  }

  navigateToWebview() {
    const { navigation } = this.context;
    const { eventId, setActiveEventId } = this.props;

    setActiveEventId(eventId);
    navigation.navigate('WebView');
  }
  
  render() {
    const { likesCount } = this.props;
    return (
      <ActionButton
        imageUri={HEART_BUTTON}
        label={likesCount}
        onPress={this.navigateToWebview}
      />
    );
  }
}

HeartButton.propTypes = {
  eventId: PropTypes.string,
  likesCount: PropTypes.number,
  setActiveEventId: PropTypes.func,
};

HeartButton.contextTypes = {
  navigation: PropTypes.object,
};

export default HeartButton;
