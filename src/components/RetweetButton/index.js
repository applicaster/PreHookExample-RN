import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ActionButton from '../ActionButton';
import { RETWEET_ICON } from '../../icons';

class RetweetButton extends Component {
  render() {
    const { retweetCount } = this.props;

    return (
      <ActionButton
        imageUri={RETWEET_ICON}
        label={retweetCount}
        onPress={() => {}}
      />
    );
  }
}

RetweetButton.propTypes = {
  eventId: PropTypes.string,
  retweetCount: PropTypes.number,
};

RetweetButton.contextTypes = {
  textColor: PropTypes.string,
};

export default RetweetButton;
