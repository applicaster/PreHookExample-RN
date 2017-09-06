import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import hexToRgb from 'hex-to-rgb';
import { styles } from './style';

class EventDetailCount extends Component {
  constructor(props) {
    super(props);
    this.navigateToComments = this.navigateToComments.bind(this);
  }

  navigateToComments() {
    const { navigation } = this.context;
    const { eventId, setActiveEventId } = this.props;

    setActiveEventId(eventId);

    if (navigation.state.routeName !== 'Comments') {
      navigation.navigate('Comments');
    }
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
  count: PropTypes.number,
  eventId: PropTypes.string,
  label: PropTypes.string,
  setActiveEventId: PropTypes.func,
};

EventDetailCount.contextTypes = {
  textColor: PropTypes.string,
  navigation: PropTypes.object,
};

export default EventDetailCount;
