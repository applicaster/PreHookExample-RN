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
    const { overlay: iconOverImage } = this.props;
    const rightOffsetStyle = { right: (iconOverImage) ? 18 : 9 };
    const tintColorStyle = { tintColor: (iconOverImage) ? this.context.secondaryColor : this.context.textColor };
    
    return (
      <View style={[styles.socialIconContainer, rightOffsetStyle]}>
        <SocialIcon socialNetwork={this.props.source} tintColorStyle={tintColorStyle} />
      </View>);
  }

  renderUserName() {
    const { userName, overlay: textOverImage } = this.props;
    const colorStyle = { color: (textOverImage) ? this.context.secondaryColor : this.context.textColor };
    
    return (userName) ? <Text style={[styles.userName, colorStyle]}>@{userName}</Text> : null;
  }

  renderName() {
    const { name, overlay: textOverImage } = this.props;
    const colorStyle = { color: (textOverImage) ? this.context.secondaryTextColor : this.context.mainColor };

    return <Text style={[styles.name, colorStyle]}>{name}</Text>;
  }

  renderTimestamp() {
    const { createdAt, overlay: textOverImage } = this.props;
    const colorStyle = { color: (textOverImage) ? this.context.secondaryColor : this.context.textColor };

    return <EventTimestamp timestamp={createdAt} colorStyle={colorStyle} />;
  }

  renderHeaderInfo() {
    const { userName } = this.props;
    return (
      <View style={[styles.eventHeaderInfo, !userName && styles.eventHeaderInfoWithoutUserName]}>
        <View style={styles.userInfoContainer}>
          {this.renderName()}
          {this.renderUserName()}
        </View>
        <View style={styles.timestampContainer}>
          {this.renderTimestamp()}
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

EventHeader.contextTypes = {
  mainColor: PropTypes.string,
  secondaryColor: PropTypes.string,
  textColor: PropTypes.string,
  secondaryTextColor: PropTypes.string,
};

export default EventHeader;
