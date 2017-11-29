import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import reactStringReplace from 'react-string-replace';
import { styles } from './style';

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
