import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
import EventHeader from '../EventHeader';
import EventCaption from '../EventCaption';
import EventMedia from '../EventMedia';

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  eventContainer: {
    borderBottomColor: '#696A6B',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: screenWidth,
  },
});

class EventContainer extends Component {
  renderMedia() {
    const imageUrl = this.props.event.images.standard_resolution.url;
    const width = this.props.event.images.standard_resolution.width;
    const height = this.props.event.images.standard_resolution.height;
    return <EventMedia imageUrl={imageUrl} width={width} height={height} />;
  }
  
  renderHeader() {
    return <EventHeader event={this.props.event} overlay />;
  }

  renderCaption() {
    return <EventCaption caption={this.props.event.caption} />;
  }

  render() {
    return (
      <View style={styles.eventContainer}>
        {this.renderHeader()}
        {this.renderMedia()}
        {this.renderCaption()}
      </View>
    );
  }
}

EventContainer.propTypes = {
  event: PropTypes.object,
};

export default EventContainer;
