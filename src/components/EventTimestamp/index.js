import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
} from 'react-native';
import moment from 'moment';
import {
  isWithinAWeek,
  isWithinAYear,
} from '../../utils/time';

const styles = StyleSheet.create({
  timestamp: {
    color: '#FFFFFF',
    fontSize: 12,
    bottom: -2,
    position: 'absolute',
    left: 10,
  },
});

class EventTimestamp extends Component {
  renderTime() {
    const timestamp = this.props.timestamp;
    const eventMoment = moment.unix(timestamp);

    if (isWithinAWeek(eventMoment)) {
      return eventMoment.fromNow();
    } else if (isWithinAYear(eventMoment)) {
      return eventMoment.format('MMMM D');
    }
    
    return eventMoment.format('MMMM D, YYYY');
  }
  
  render() {
    const time = this.renderTime();
    return (<Text style={styles.timestamp}>{time}</Text>);
  }
}

EventTimestamp.propTypes = {
  timestamp: PropTypes.number,
};

export default EventTimestamp;
