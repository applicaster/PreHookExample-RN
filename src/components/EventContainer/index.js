import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
import EventHeader from '../EventHeader';
import EventCaption from '../EventCaption';

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  eventContainer: {
    borderBottomColor: '#696A6B',
    borderBottomWidth: 1,
    width,
  },
});

class EventContainer extends Component {
  render() {
    const event = this.props.event;
    return (
      <View style={styles.eventContainer}>
        <EventHeader event={event} />
        <EventCaption caption={event.caption} />
      </View>
    );
  }
}

EventContainer.propTypes = {
  event: PropTypes.object,
};

export default EventContainer;