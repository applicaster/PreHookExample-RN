import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
} from 'react-native';
import reactStringReplace from 'react-string-replace';

const styles = StyleSheet.create({
  eventCaption: {
    color: '#FFFFFF',
    fontSize: 18,
    paddingHorizontal: 12,
    paddingVertical: 17,
    // TODO: Fonts?
  },
  highlight: {
    color: '#7ED321',
  },
});

class EventCaption extends Component {
  highlightHashtagsAndUsers(caption) {
    const regex = /([@|#][A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)/g;
    const matchCallback = (match, i) => (<Text key={i} style={styles.highlight}>{match}</Text>);
    return reactStringReplace(caption, regex, matchCallback);
  }
  
  render() {
    return (this.props.caption && this.props.caption.text)
    ? <Text style={styles.eventCaption}>
      {this.highlightHashtagsAndUsers(this.props.caption.text)}
    </Text>
    : null;
  }
}

EventCaption.propTypes = {
  caption: PropTypes.object,
};

export default EventCaption;
