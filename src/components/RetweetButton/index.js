import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FeedRNUtils from '@applicaster/feed-rn-utils';
import { sendAnalyticEvent } from 'react-native-zapp-bridge';
import { RETWEET_CLICKED } from '../../constants/analyticEvents';
import ActionButton from '../ActionButton';
import { RETWEET_ICON } from '../../icons';

class RetweetButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      retweeted: false,
      selected: false,
      retweetCount: props.retweetCount,
    };

    this.retweet = this.retweet.bind(this);
  }

  retweet() {
    const { eventId } = this.props;
    const { retweetCount, retweeted, selected } = this.state;

    if (retweeted) return;

    FeedRNUtils.retweet(eventId)
    .then(() => this.setState({ retweeted: true }))
    .catch(error => {
      if (error.code === '500') { // User cancelled login
        this.setState({
          selected: false,
          retweeted: false,
          retweetCount,
        });
      } else if (retweeted) {
        this.setState({
          retweetCount: retweetCount - 1,
          selected: false,
          retweeted: false,
        });
      }
    });
    
    if (!selected) {
      this.setState({
        retweetCount: retweetCount + 1,
        selected: true,
      });
    }

    sendAnalyticEvent(RETWEET_CLICKED, { eventId, retweetCount }).then().catch();
  }
  
  render() {
    const { retweetCount, selected } = this.state;
    
    return (
      <ActionButton
        imageUri={RETWEET_ICON}
        label={retweetCount}
        onPress={this.retweet}
        selected={selected}
      />
    );
  }
}

RetweetButton.propTypes = {
  eventId: PropTypes.string,
  retweetCount: PropTypes.number,
};

export default RetweetButton;
