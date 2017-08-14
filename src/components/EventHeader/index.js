import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  Text,
  View,
} from 'react-native';
import EventTimestamp from '../EventTimestamp';
import SocialIcon from '../SocialIcon';
import { styles } from './styles';

class EventHeader extends Component {
  renderSocialIcon() {
    return (
      <View style={styles.socialIconContainer}>
        <SocialIcon style={styles.socialIconContainer} socialNetwork={this.props.source} />
      </View>);
  }

  renderUserName() {
    const { userName } = this.props;
    return (userName) ? <Text style={styles.userName}>@{userName}</Text> : null;
  }

  renderHeaderInfo() {
    const { createdAt, name, userName } = this.props;
    return (
      <View style={[styles.eventHeaderInfo, !userName && styles.eventHeaderInfoWithoutUserName]}>
        <View style={styles.userInfoContainer}>
          <Text style={styles.fullName}>{name}</Text>
          {this.renderUserName()}
        </View>
        <View style={styles.timestampContainer}>
          <EventTimestamp timestamp={createdAt} />
        </View>
      </View>
    );
  }

  renderAvatarImage() {
    const { avatarImageUrl } = this.props;
    return <Image style={styles.avatar} source={{ uri: avatarImageUrl }} />;
  }

  render() {
    const { overlay } = this.props;
    return (
      <View style={[styles.eventHeader, overlay && styles.eventHeaderOverlay]}>
        {this.renderAvatarImage()}
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
