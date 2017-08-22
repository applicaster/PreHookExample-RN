import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
 } from 'react-native';
import hexToRgb from 'hex-to-rgb';

const styles = StyleSheet.create({
  eventDetailCount: {
    flexDirection: 'row',
    marginRight: 5,
  },
  count: {
    fontSize: 12,
    marginRight: 3,
  },
  label: {
    fontSize: 12,
  },
});

const EventDetailCount = ({ label, count = 0 }, { textColor }) => {
  const rgb = hexToRgb(textColor || '#FFFFFF');
  const rgbaColor = `rgba(${rgb[0]},${rgb[1]},${rgb[2]}, 0.60)`;
  const textColorStyle = { color: rgbaColor };
  return (
    <View style={styles.eventDetailCount}>
      <Text key={'count'} style={[styles.count, textColorStyle]}>{count}</Text>
      <Text key={'label'} style={[styles.label, textColorStyle]}>{label}</Text>
    </View>
  );
};

EventDetailCount.propTypes = {
  label: PropTypes.string,
  count: PropTypes.number,
};

EventDetailCount.contextTypes = {
  textColor: PropTypes.string,
};

export default EventDetailCount;
