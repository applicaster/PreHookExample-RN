import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
import hexToRgb from 'hex-to-rgb';
import EventHeader from '../EventHeader';
import EventCaption from '../EventCaption';
import EventMedia from '../EventMedia';
import ActionBar from '../ActionBar';

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  eventContainer: {
    borderBottomColor: '#696A6B',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: screenWidth,
    overflow: 'hidden',
  },
});

class EventContainer extends Component {
  getEventSeparatorStyles() {
    const rgb = hexToRgb(this.context.textColor || '#FFFFFF');
    const rgbaColor = `rgba(${rgb[0]},${rgb[1]},${rgb[2]}, 0.3)`;
    return { borderBottomColor: rgbaColor };
  }
  
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
      socialNetwork={source}
      textToShare={caption}
    />
    );
  }

  render() {
    const containerSeparatorColor = this.getEventSeparatorStyles();
    return (
      <View style={[styles.eventContainer, containerSeparatorColor]}>
        {this.renderMedia()}
        {this.renderHeader()}
        {this.renderCaption()}
        {this.renderActionBar()}
      </View>
    );
  }
}

EventContainer.propTypes = {
  event: PropTypes.object,
};

EventContainer.contextTypes = {
  textColor: PropTypes.string,
};

export default EventContainer;
