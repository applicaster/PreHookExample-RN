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
    fontSize: 14,
    paddingHorizontal: 12,
    paddingTop: 17,
    paddingBottom: 12,
    lineHeight: 18,
  },
  highlight: {
    color: '#7ED321',
  },
});

class EventCaption extends Component {
  highlightHashtagsAndUsers(caption) {
    const regex = /([@|#][\w](?:(?:[\w]|(?:\.(?!\.))){0,28}(?:[\w]))?)/g;
    const matchCallback = (match, i) => (<Text key={i} style={styles.highlight}>{match}</Text>);
    return reactStringReplace(caption, regex, matchCallback);
  }
  
  render() {
    return (this.props.caption)
    ? <Text style={styles.eventCaption}>
      {this.highlightHashtagsAndUsers(this.props.caption)}
    </Text>
    : <Text />;
  }
}

EventCaption.propTypes = {
  caption: PropTypes.string,
};

export default EventCaption;
