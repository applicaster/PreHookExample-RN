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
  },
});

class EventContainer extends Component {
  getEventSeparatorStyles() {
    const rgb = hexToRgb(this.context.textColor || '#FFFFFF');
    const rgbaColor = `rgba(${rgb[0]},${rgb[1]},${rgb[2]}, 0.5)`;
    return { borderBottomColor: rgbaColor };
  }
  
  renderMedia() {
    const { type } = this.props.event;
    if (type === 'image' || type === 'video' || type === 'gallery') {
      const { url, height, width } = this.props.event.images.default;
      return <EventMedia imageUrl={url} width={width} height={height} />;
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
    return (<ActionBar
      socialNetwork={this.props.event.source}
      likesCount={this.props.event.likesCount}
      commentsCount={this.props.event.commentsCount}
    />
    );
  }

  render() {
    const containerSeparatorColor = this.getEventSeparatorStyles();
    return (
      <View style={[styles.eventContainer, containerSeparatorColor]}>
        {this.renderHeader()}
        {this.renderMedia()}
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
