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
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 10,
    height: 40,
    width: 220,
  },
  eventHeaderInfoWithoutUserName: {
    justifyContent: 'center',
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

  renderHeaderInfo() {
    const { createdAt, name, userName } = this.props;
    const userNameTextView = (userName) ? <Text style={styles.userName}>@{userName}</Text> : null;
    return (
      <View style={[styles.eventHeaderInfo, !userName && styles.eventHeaderInfoWithoutUserName]}>
        <View style={styles.userInfoContainer}>
          <Text style={styles.fullName}>{name}</Text>
          {userNameTextView}
        </View>
        <View style={styles.timestampContainer}>
          <EventTimestamp timestamp={createdAt} />
        </View>
      </View>
    );
  }

  render() {
    const { avatarImageUrl, overlay } = this.props;
    return (
      <View style={[styles.eventHeader, overlay && styles.eventHeaderOverlay]}>
        <Image
          style={styles.thumbnail}
          source={{ uri: avatarImageUrl }}
        />
        {this.renderHeaderInfo()}
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
