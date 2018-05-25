import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import moment from 'moment-with-locales-es6';
import {
  isWithinAWeek,
  isWithinAYear,
} from '../../../../../../utils/time';
import { styles } from './style';

class Timestamp extends Component {
  renderTime() {
    moment.locale('es');
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
    const capitalizeFirstLetter = (string) => string[0].toUpperCase() + string.slice(1);
    
    return (<Text style={[styles.timestamp, colorStyle]}>{capitalizeFirstLetter(time)}</Text>);
  }
}

Timestamp.propTypes = {
  colorStyle: PropTypes.object.isRequired,
  timestamp: PropTypes.number.isRequired,
};

export default Timestamp;
