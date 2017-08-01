import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  eventContainer: {
    width,
  },
});

class EventContainer extends Component {
  renderCaption(caption) {
    return (caption && caption.text) ? caption.text : null;
  }

  render() {
    const event = this.props.event;
    return (
      <View style={styles.eventContainer}>
        <Image
          style={{ width, height: width }}
          source={{ uri: event.images.standard_resolution.url }}
        />
        <Text>{this.renderCaption(event.caption)}</Text>
      </View>
    );
  }
}

EventContainer.propTypes = {
  event: PropTypes.object,
};

export default EventContainer;
