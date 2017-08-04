import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
} from 'react-native';
import moment from 'moment';
import {
  isWithinAnHour,
  isWithinAWeek,
  isWithinAYear,
  isYesterday,
  isToday,
} from '../../utils/time';

const styles = StyleSheet.create({
  timestamp: {
    color: '#FFFFFF',
    fontSize: 12,
    bottom: 0,
    position: 'absolute',
    left: 10,
  },
});

class EventTimestamp extends Component {
  renderTime() {
    const timestamp = this.props.timestamp;
    const eventMoment = moment.unix(timestamp);

    if (isWithinAnHour(eventMoment)) {
      return eventMoment.fromNow();
    } else if (isToday(eventMoment)) {
      return eventMoment.format('[Today at] h.m A');
    } else if (isYesterday(eventMoment)) {
      return eventMoment.format('[Yesterday at] h.m A');
    } else if (isWithinAWeek(eventMoment)) {
      return eventMoment.format('dddd [at] h.m A');
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
