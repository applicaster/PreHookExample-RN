import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import EventDetailCount from '../EventDetailCount';
import ShareButton from '../ShareButton';
import TwitterActionButtons from '../TwitterActionButtons';
import { styles } from './style';

class ActionBar extends Component {
  renderShareButton() {
    return (<View style={styles.shareButtonContainer}>
      <ShareButton message={this.props.textToShare} />
    </View>);
  }
  
  renderInstagramBar() {
    const { likesCount, commentsCount, eventId, eventOriginUrl } = this.props;
    return (
      <View style={[styles.buttonBar]}>
        <EventDetailCount key={'likes'} eventOriginUrl={eventOriginUrl} openOriginUrl eventId={eventId} count={likesCount} label={'Likes'} />
        <EventDetailCount key={'comments'} eventOriginUrl={eventOriginUrl} openOriginUrl eventId={eventId} count={commentsCount} label={'Comments'} />
        {this.renderShareButton()}
      </View>
    );
  }

  renderTwitterBar() {
    const { likesCount, commentsCount, eventId, retweetCount } = this.props;
    return (
      <View style={[styles.buttonBar]}>
        <TwitterActionButtons
          eventId={eventId}
          favoriteCount={likesCount}
          replyCount={commentsCount}
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
        <EventDetailCount key={'likes'} eventId={eventId} count={likesCount} label={'Likes'} />
        <EventDetailCount key={'comments'} eventId={eventId} count={commentsCount} label={'Comments'} />
        {this.renderShareButton()}
      </View>
    );
  }

  render() {
    switch (this.props.socialNetwork) {
      case 'instagram':
        return this.renderInstagramBar();
      case 'facebook':
        return this.renderFacebookBar();
      case 'twitter':
        return this.renderTwitterBar();
      default:
        return null;
    }
  }
}

ActionBar.propTypes = {
  commentsCount: PropTypes.number,
  eventId: PropTypes.string,
  eventOriginUrl: PropTypes.string,
  socialNetwork: PropTypes.string,
  likesCount: PropTypes.number,
  commentsCount: PropTypes.number,
  textToShare: PropTypes.string,
};

ActionBar.contextTypes = {
  navigation: PropTypes.object,
};

export default ActionBar;
