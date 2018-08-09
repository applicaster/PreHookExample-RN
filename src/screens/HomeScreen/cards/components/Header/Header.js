import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  Text,
  View,
} from 'react-native';
import Timestamp from './Timestamp';
import SocialIcon from './SocialIcon';
import { styles } from './style';

export default class Header extends Component {
  renderSocialIcon() {
    const { overlay: iconOverImage } = this.props;
    const { secondaryColor, textColor } = this.context.styles;
    const tintColorStyle = { tintColor: (iconOverImage) ? secondaryColor : textColor };
    
    return (
      <View style={styles.socialIconContainer}>
        <SocialIcon socialNetwork={this.props.source} tintColorStyle={tintColorStyle} />
      </View>);
  }

  renderUserName() {
    const { userName, overlay: textOverImage } = this.props;
    const { secondaryColor, textColor } = this.context.styles;

    const colorStyle = { color: (textOverImage) ? secondaryColor : textColor };
    
    return (userName) ? <Text style={[styles.userName, colorStyle]}>@{userName}</Text> : null;
  }

  renderName() {
    const { name } = this.props;
    const colorStyle = { color: this.context.styles.mainColor };

    return <Text style={[styles.name, colorStyle]}>{name}</Text>;
  }

  renderTimestamp() {
    const { createdAt, overlay: textOverImage } = this.props;
    const { secondaryColor, textColor } = this.context.styles;

    const colorStyle = { color: (textOverImage) ? secondaryColor : textColor };

    return <Timestamp timestamp={createdAt} colorStyle={colorStyle} />;
  }

  renderHeaderInfo() {
    const { userName, isEditorial } = this.props;
    const userInfo = (
      <View style={styles.userInfoContainer}>
        {this.renderName()}
        {this.renderUserName()}
      </View>
    );

    const headerStyles = [
      styles.eventHeaderInfo,
      !userName && styles.eventHeaderInfoWithoutUserName,
      isEditorial && styles.eventHeaderOnlyTimestamp,
    ];

    return (
      <View style={headerStyles}>
        {!isEditorial && userInfo}
        <View style={styles.timestampContainer}>
          {this.renderTimestamp()}
        </View>
      </View>
    );
  }

  renderAvatarImage() {
    const { avatarImageUrl } = this.props;
    if (!avatarImageUrl) return null;
    
    return <Image style={styles.avatar} source={{ uri: avatarImageUrl }} />;
  }

  render() {
    const { isSocial, isEditorial, overlay } = this.props;
    return (
      <View style={[styles.eventHeader, overlay && styles.eventHeaderOverlay]}>
        {!isEditorial && this.renderAvatarImage()}
        {this.renderHeaderInfo()}
        {isSocial && this.renderSocialIcon()}
      </View>
    );
  }
}

Header.propTypes = {
  avatarImageUrl: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
  isSocial: PropTypes.bool.isRequired,
  isEditorial: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  overlay: PropTypes.bool.isRequired,
  source: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

Header.defaultProps = {
  isEditorial: false,
  isSocial: false,
};

Header.contextTypes = {
  styles: PropTypes.object,
};
