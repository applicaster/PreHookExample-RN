import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FeedRNUtils from '@applicaster/feed-rn-utils';
import ActionButton from '../ActionButton';
import { FAVORITE_TWEET_BUTTON } from '../../icons';

class FavoriteTweetButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favorited: props.favorited || false,
      selected: false,
      favoriteCount: props.favoriteCount,
    };

    this.favorite = this.favorite.bind(this);
  }

  favorite() {
    const { eventId } = this.props;
    const { favoriteCount, favorited, selected } = this.state;

    if (favorited) {
      return;
    }

    FeedRNUtils.favoriteTweet(eventId)
    .then(() => this.setState({ favorited: true }))
    .catch(error => {
      if (error.code === '500') { // User cancelled login
        this.setState({
          selected: false,
          favorited: false,
          favoriteCount,
        });
      } else if (favorited) {
        this.setState({
          favoriteCount: favoriteCount - 1,
          selected: false,
          favorited: false,
        });
      }
    });
    
    if (!selected) {
      this.setState({
        favoriteCount: favoriteCount + 1,
        selected: true,
      });
    }
  }
  
  render() {
    const { favoriteCount, selected } = this.state;
    
    return (
      <ActionButton
        imageUri={FAVORITE_TWEET_BUTTON}
        label={favoriteCount}
        onPress={this.favorite}
        selected={selected}
      />
    );
  }
}

FavoriteTweetButton.propTypes = {
  eventId: PropTypes.string,
  favoriteCount: PropTypes.number,
  favorited: PropTypes.bool,
};

export default FavoriteTweetButton;
