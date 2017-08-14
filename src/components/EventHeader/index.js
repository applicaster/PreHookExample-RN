import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
    fontWeight: '600',
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 10,
  },
  socialIcon: {
    height: 30,
    width: 30,
    right: 9,
    top: 9,
    position: 'absolute',
  },
});

const INSTAGRAM_ICON = 'InstagramIcon';

class EventHeader extends Component {
  renderSocialIcon() {
    const source = this.props.source;
    const sourceToIconMapping = {
      facebook: 'FacebookIcon',
      instagram: 'InstagramIcon',
      twitter: 'TwitterIcon',
    };

    return <Image style={styles.socialIcon} source={{ uri: sourceToIconMapping[source] }} />;
  }

  render() {
    const {
      avatarImageUrl,
      createdAt,
      name,
      overlay,
      userName } = this.props;
    
    return (
      <View style={[styles.eventHeader, overlay && styles.eventHeaderOverlay]}>
        <Image
          style={styles.thumbnail}
          source={{ uri: avatarImageUrl }}
        />
        <View style={styles.eventHeaderInfo}>
          <Text style={styles.fullName}>{name}</Text>
          <Text style={styles.userName}>@{userName}</Text>
          <EventTimestamp timestamp={createdAt} />
        </View>
        {this.renderSocialIcon()}
      </View>
    );
  }
}

EventHeader.propTypes = {
  avatarImageUrl: PropTypes.string,
  createdAt: PropTypes.number,
  name: PropTypes.string,
  overlay: PropTypes.bool,
  source: PropTypes.string,
  userName: PropTypes.string,
};

export default EventHeader;
