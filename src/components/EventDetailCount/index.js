import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
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

class EventDetailCount extends Component {
  constructor(props) {
    super(props);
    this.navigateToComments = this.navigateToComments.bind(this);
  }

  navigateToComments() {
    const { navigation } = this.context;
    navigation.navigate('Comments');
  }

  render() {
    const { label, count = 0 } = this.props;
    const { textColor } = this.context;
    const rgb = hexToRgb(textColor || '#FFFFFF');
    const rgbaColor = `rgba(${rgb[0]},${rgb[1]},${rgb[2]}, 0.60)`;
    const textColorStyle = { color: rgbaColor };
    return (
      <TouchableWithoutFeedback onPress={this.navigateToComments}>
        <View style={styles.eventDetailCount}>
          <Text key={'count'} style={[styles.count, textColorStyle]}>{count}</Text>
          <Text key={'label'} style={[styles.label, textColorStyle]}>{label}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

EventDetailCount.propTypes = {
  label: PropTypes.string,
  count: PropTypes.number,
};

EventDetailCount.contextTypes = {
  textColor: PropTypes.string,
  navigation: PropTypes.object,
};

export default EventDetailCount;
