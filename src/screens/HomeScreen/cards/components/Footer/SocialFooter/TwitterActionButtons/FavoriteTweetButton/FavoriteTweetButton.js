import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FeedRNUtils from '@applicaster/feed-rn-utils';
import { sendAnalyticEvent } from 'react-native-zapp-bridge';
import {
  FAVORITE_TWEET_CLICKED,
  UNFAVORITE_TWEET_CLICKED,
} from '../../../../../../../../constants/analyticEvents';
import ActionButton from '../../../ActionButton';
import { FAVORITE_TWEET_BUTTON } from '../../../../../../../../icons';

class FavoriteTweetButton extends Component {
  constructor(props) {
    super(props);
    
    const { eventId, favorites } = props;
    this.state = {
      favorited: !!favorites[eventId],
      selected: !!favorites[eventId],
      favoriteCount: props.favoriteCount,
    };

    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.unfavorite = this.unfavorite.bind(this);
    this.favorite = this.favorite.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { favorites } = nextProps;
    const { eventId } = this.props;
    if (favorites[eventId]) {
      this.setState({
        favorited: true,
        selected: true,
      });
    }
  }

  toggleFavorite() {
    const { favorited } = this.state;
    if (favorited) {
      this.unfavorite();
    } else {
      this.favorite();
    }
  }

  unfavorite() {
    const { favorited, favoriteCount, selected } = this.state;
    const { eventId } = this.props;

    FeedRNUtils.unfavoriteTweet(eventId)
    .then(() => {
      this.setState({ favorited: false });
      sendAnalyticEvent(UNFAVORITE_TWEET_CLICKED, { eventId }).then().catch();
    })
    .catch(error => {
      if (error.code === '500') { // User cancelled login
        this.setState({
          selected: true,
          favorited: true,
          favoriteCount,
        });
      } else if (favorited) {
        this.setState({
          favoriteCount,
          selected: true,
          favorited: true,
        });
      }
    });
    
    if (selected) {
      this.setState({
        favoriteCount: favoriteCount - 1,
        selected: false,
      });
    }
  }

  favorite() {
    const { eventId } = this.props;
    const { favoriteCount, favorited, selected } = this.state;

    FeedRNUtils.favoriteTweet(eventId)
    .then(() => {
      this.setState({ favorited: true });
      sendAnalyticEvent(FAVORITE_TWEET_CLICKED, { eventId }).then().catch();
    })
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
        onPress={this.toggleFavorite}
        selected={selected}
      />
    );
  }
}

FavoriteTweetButton.propTypes = {
  eventId: PropTypes.string.isRequired,
  favoriteCount: PropTypes.number.isRequired,
  favorites: PropTypes.object.isRequired,
};

export default FavoriteTweetButton;
