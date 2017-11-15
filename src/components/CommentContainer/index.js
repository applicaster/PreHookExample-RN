import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
import CommentHeader from '../CommentHeader';
import Comment from '../Comment';

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  commentContainer: {
    borderBottomColor: '#696A6B',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: screenWidth,
    overflow: 'hidden',
  },
});

class CommentContainer extends Component {
  renderCommentHeader() {
    const { source, type, user, createdAt } = this.props.comment;
    const { avatarImageUrl, name, userName } = user;
    const overlayHeaderOnMedia = (type === 'image') || (type === 'video') || (type === 'gallery');

    return (<CommentHeader
      avatarImageUrl={avatarImageUrl}
      createdAt={createdAt}
      name={name}
      overlay={overlayHeaderOnMedia}
      source={source}
      userName={userName}
    />);
  }

  renderComment() {
    return <Comment caption={this.props.comment.caption} />;
  }

  render() {
    const { textColor = '#FFFFFF' } = this.context;
    const containerSeparatorColor = { borderBottomColor: `${textColor}4D` };
    return (
      <View style={[styles.commentContainer, containerSeparatorColor]}>
        {this.renderCommentHeader()}
        {this.renderComment()}
      </View>
    );
  }
}

CommentContainer.propTypes = {
  comment: PropTypes.object,
};

CommentContainer.contextTypes = {
  textColor: PropTypes.string,
};

export default CommentContainer;
