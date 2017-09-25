import React, { Component } from 'react';
import PropTypes from 'prop-types';
import reactStringReplace from 'react-string-replace';
import {
  StyleSheet,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  comment: {
    fontSize: 14,
    paddingHorizontal: 12,
    paddingTop: 6,
    paddingBottom: 12,
    lineHeight: 18,
  },
});

class Comment extends Component {
  highlightHashtagsAndUsers(caption) {
    const highlightColor = { color: this.context.mainColor };
    const regex = /([@|#][\w](?:(?:[\w]|(?:\.(?!\.))){0,28}(?:[\w]))?)/g;
    const matchCallback = (match, i) => (<Text key={i} style={highlightColor}>{match}</Text>);
    return reactStringReplace(caption, regex, matchCallback);
  }

  render() {
    const { caption } = this.props;
    const captionColor = { color: this.context.textColor };
    return <Text style={[styles.comment, captionColor]}>{this.highlightHashtagsAndUsers(caption)}</Text>;
  }
}

Comment.propTypes = {
  caption: PropTypes.string,
};

Comment.contextTypes = {
  mainColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default Comment;
