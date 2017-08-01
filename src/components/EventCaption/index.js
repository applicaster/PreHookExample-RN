import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  eventCaption: {
    color: '#FFFFFF',
    fontSize: 18,
    paddingHorizontal: 12,
    paddingVertical: 17,
    // TODO: Fonts?
  },
});

class EventCaption extends Component {
  render() {
    return (this.props.caption && this.props.caption.text)
    ? <Text style={styles.eventCaption}>{this.props.caption.text}</Text>
    : null;
  }
}

EventCaption.propTypes = {
  caption: PropTypes.object,
};

export default EventCaption;
