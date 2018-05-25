import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { timeFromNow } from '../../../../../../utils/time';
import { styles } from './style';

class Timestamp extends Component {
  render() {
    const { colorStyle, timestamp } = this.props;
    const time = timeFromNow(timestamp);
    const capitalizeFirstLetter = (string) => string[0].toUpperCase() + string.slice(1);
    
    return (<Text style={[styles.timestamp, colorStyle]}>{capitalizeFirstLetter(time)}</Text>);
  }
}

Timestamp.propTypes = {
  colorStyle: PropTypes.object.isRequired,
  timestamp: PropTypes.number.isRequired,
};

export default Timestamp;
