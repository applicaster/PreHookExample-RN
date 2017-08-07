import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import EventTimestamp from '../EventTimestamp';

const styles = StyleSheet.create({
  eventHeader: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  eventHeaderInfo: {
    paddingLeft: 10,
  },
  thumbnail: {
    height: 40,
    width: 40,
  },
  fullName: {
    color: '#7ED321',
    fontSize: 14,
    marginBottom: -2,
  },
  userName: {
    color: '#DEDEDE',
    fontSize: 10,
  },
  socialIcon: {
    right: 9,
    top: 9,
    position: 'absolute',
  },
});

class EventHeader extends Component {
  render() {
    const event = this.props.event;
    const timestamp = parseInt(event.created_time);
    return (
      <View style={styles.eventHeader}>
        <Image
          style={styles.thumbnail}
          source={{ uri: event.user.profile_picture }}
        />
        <View style={styles.eventHeaderInfo}>
          <Text style={styles.fullName}>{event.user.full_name}</Text>
          <Text style={styles.userName}>@{event.user.username}</Text>
          <EventTimestamp timestamp={timestamp} />
        </View>
        <Icon style={styles.socialIcon} name="instagram" size={30} color="#FFFFFF" />
      </View>
    );
  }
}

EventHeader.propTypes = {
  event: PropTypes.object,
};

export default EventHeader;
