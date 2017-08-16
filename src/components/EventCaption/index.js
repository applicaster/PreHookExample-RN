import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
} from 'react-native';
import reactStringReplace from 'react-string-replace';

const styles = StyleSheet.create({
  eventCaption: {
    fontSize: 14,
    paddingHorizontal: 12,
    paddingTop: 17,
    paddingBottom: 12,
    lineHeight: 18,
  },
});

class EventCaption extends Component {
  highlightHashtagsAndUsers(caption) {
    const highlightColor = { color: this.context.mainColor };
    const regex = /([@|#][\w](?:(?:[\w]|(?:\.(?!\.))){0,28}(?:[\w]))?)/g;
    const matchCallback = (match, i) => (<Text key={i} style={highlightColor}>{match}</Text>);
    return reactStringReplace(caption, regex, matchCallback);
  }
  
  render() {
    const captionColor = { color: this.context.textColor };
    return (this.props.caption)
    ? <Text style={[styles.eventCaption, captionColor]}>
      {this.highlightHashtagsAndUsers(this.props.caption)}
    </Text>
    : <Text />;
  }
}

EventCaption.propTypes = {
  caption: PropTypes.string,
};

EventCaption.contextTypes = {
  mainColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default EventCaption;
