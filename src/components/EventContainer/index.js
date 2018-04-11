import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import EventHeader from '../EventHeader';
import EventCaption from '../EventCaption';
import EventMedia from '../EventMedia';
import ActionBar from '../ActionBar';
import { styles } from './style';

class EventContainer extends Component {
  renderMedia() {
    const { type } = this.props.event;
    if (type === 'image' || type === 'video' || type === 'gallery') {
      const { url, height, width } = this.props.event.images.default;
      const { videoUrl, id } = this.props.event;
      return (<EventMedia
        eventId={id}
        imageUrl={url}
        width={width}
        height={height}
        videoUrl={videoUrl}
      />);
    }

    return null;
  }
  
  renderHeader() {
    const { source, type, user, createdAt } = this.props.event;
    const { avatarImageUrl, name, userName } = user;
    const overlayHeaderOnMedia = (type === 'image') || (type === 'video') || (type === 'gallery');

    return (<EventHeader
      avatarImageUrl={avatarImageUrl}
      createdAt={createdAt}
      name={name}
      overlay={overlayHeaderOnMedia}
      source={source}
      userName={userName}
    />);
  }

  renderCaption() {
    return <EventCaption caption={this.props.event.caption} />;
  }

  renderActionBar() {
    const { source, likesCount, commentsCount, caption, id, originUrl, retweetCount } = this.props.event;
    return (<ActionBar
      commentsCount={commentsCount}
      eventId={id}
      eventOriginUrl={originUrl}
      likesCount={likesCount}
      retweetCount={retweetCount}
      source={source}
      textToShare={caption}
    />
    );
  }

  render() {
    const backgroundColorStyle = { backgroundColor: this.context.backgroundColor };

    return (
      <View style={styles.cardContainer}>
        <View style={[styles.eventContainer, backgroundColorStyle]}>
          {this.renderMedia()}
          {this.renderHeader()}
          {this.renderCaption()}
          {this.renderActionBar()}
        </View>
      </View>
    );
  }
}

EventContainer.propTypes = {
  event: PropTypes.object,
};

EventContainer.contextTypes = {
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default EventContainer;
