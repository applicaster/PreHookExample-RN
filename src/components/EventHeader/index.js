import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import EventTimestamp from '../EventTimestamp';

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  eventHeader: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  eventHeaderOverlay: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    zIndex: 2,
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
    const { event, overlay } = this.props;
    const timestamp = parseInt(event.created_time);
    return (
      <View style={[styles.eventHeader, overlay && styles.eventHeaderOverlay]}>
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
  overlay: PropTypes.bool,
};

export default EventHeader;
