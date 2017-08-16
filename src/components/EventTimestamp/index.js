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
    const { colorStyle } = this.props;
    const time = this.renderTime();
    
    return (<Text style={[styles.timestamp, colorStyle]}>{time}</Text>);
  }
}

EventTimestamp.propTypes = {
  colorStyle: PropTypes.object,
  timestamp: PropTypes.number,
};

export default EventTimestamp;
