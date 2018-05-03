import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  Text,
  View,
} from 'react-native';
import EventTimestamp from '../EventTimestamp';
import { styles } from './styles';

class CommentHeader extends Component {
  renderUserName() {
    const { userName } = this.props;
    const colorStyle = { color: this.context.textColor };
    
    return (userName) ? <Text style={[styles.userName, colorStyle]} numberOfLines={1}>@{userName}</Text> : null;
  }

  renderName() {
    const { name } = this.props;
    const colorStyle = { color: this.context.mainColor };

    return <Text style={[styles.name, colorStyle]} numberOfLines={1}>{name}</Text>;
  }

  renderTimestamp() {
    const { createdAt } = this.props;
    const colorStyle = { color: this.context.textColor };

    return <EventTimestamp timestamp={createdAt} colorStyle={colorStyle} />;
  }

  renderHeaderInfo() {
    const { userName } = this.props;
    return (
      <View style={[styles.commentHeaderInfo, !userName && styles.commentHeaderInfoWithoutUserName]}>
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
    return (
      <View style={[styles.commentHeader]}>
        {this.renderAvatarImage()}
        {this.renderHeaderInfo()}
      </View>
    );
  }
}

CommentHeader.propTypes = {
  avatarImageUrl: PropTypes.string,
  createdAt: PropTypes.number,
  name: PropTypes.string,
  userName: PropTypes.string,
};

CommentHeader.contextTypes = {
  mainColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default CommentHeader;
