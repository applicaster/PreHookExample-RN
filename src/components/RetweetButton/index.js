import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FeedRNUtils from '@applicaster/feed-rn-utils';
import ActionButton from '../ActionButton';
import { RETWEET_ICON } from '../../icons';

class RetweetButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      retweeted: false,
      retweetCount: props.retweetCount,
    };

    this.retweet = this.retweet.bind(this);
  }

  retweet() {
    const { eventId } = this.props;
    const { retweetCount, retweeted } = this.state;
    FeedRNUtils.retweet(eventId).then(() => {}).catch(() => {});
    
    if (!retweeted) {
      this.setState({
        retweetCount: retweetCount + 1,
        retweeted: true,
      });
    }
  }
  
  render() {
    const { retweetCount, retweeted } = this.state;
    
    return (
      <ActionButton
        imageUri={RETWEET_ICON}
        label={retweetCount}
        onPress={this.retweet}
        selected={retweeted}
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
