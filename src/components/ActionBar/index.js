import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import ShareButton from '../ShareButton';
import FacebookActionButtons from '../FacebookActionButtons';
import InstagramActionButtons from '../InstagramActionButtons';
import TwitterActionButtons from '../TwitterActionButtons';
import { styles } from './style';

class ActionBar extends Component {
  renderShareButton() {
    return (<View style={styles.shareButtonContainer}>
      <ShareButton message={this.props.textToShare} />
    </View>);
  }
  
  renderInstagramBar() {
    const { likesCount, commentsCount, eventId } = this.props;
    return (
      <View style={[styles.buttonBar]}>
        <InstagramActionButtons
          eventId={eventId}
          commentsCount={commentsCount}
          likesCount={likesCount}
        />
        {this.renderShareButton()}
      </View>
    );
  }

  renderTwitterBar() {
    const { likesCount, eventId, retweetCount } = this.props;
    return (
      <View style={[styles.buttonBar]}>
        <TwitterActionButtons
          eventId={eventId}
          favoriteCount={likesCount}
          retweetCount={retweetCount}
        />
        {this.renderShareButton()}
      </View>
    );
  }

  renderFacebookBar() {
    const { likesCount, commentsCount, eventId } = this.props;
    return (
      <View style={[styles.buttonBar]}>
        <FacebookActionButtons
          eventId={eventId}
          commentsCount={commentsCount}
          likesCount={likesCount}
        />
        {this.renderShareButton()}
      </View>
    );
  }

  renderBasicBar() {
    return (
      <View style={[styles.buttonBar]}>
        {this.renderShareButton()}
      </View>
    );
  }

  render() {
    switch (this.props.source) {
      case 'instagram':
        return this.renderInstagramBar();
      case 'facebook':
        return this.renderFacebookBar();
      case 'twitter':
        return this.renderTwitterBar();
      default:
        return this.renderBasicBar();
    }
  }
}

ActionBar.propTypes = {
  commentsCount: PropTypes.number,
  eventId: PropTypes.string,
  source: PropTypes.string,
  likesCount: PropTypes.number,
  textToShare: PropTypes.string,
  retweetCount: PropTypes.number,
};

ActionBar.contextTypes = {
  navigation: PropTypes.object,
};

export default ActionBar;
