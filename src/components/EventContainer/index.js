import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
import EventHeader from '../EventHeader';
import EventCaption from '../EventCaption';
import EventMedia from '../EventMedia';

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  eventContainer: {
    borderBottomColor: '#696A6B',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: screenWidth,
  },
});

class EventContainer extends Component {
  renderMedia() {
    const { url, height, width } = this.props.event.images.standard_resolution;
    return <EventMedia imageUrl={url} width={width} height={height} />;
  }
  
  renderHeader() {
    const event = this.props.event;
    const user = event.user;
    
    return (<EventHeader
      avatarImageUrl={user.avatarImageUrl}
      createdAt={event.createdAt}
      name={user.name}
      overlay
      source={event.source}
      userName={user.userName}
    />);
  }

  renderCaption() {
    return <EventCaption caption={this.props.event.caption} />;
  }

  render() {
    return (
      <View style={styles.eventContainer}>
        {this.renderHeader()}
        {this.renderMedia()}
        {this.renderCaption()}
      </View>
    );
  }
}

EventContainer.propTypes = {
  event: PropTypes.object,
};

export default EventContainer;
