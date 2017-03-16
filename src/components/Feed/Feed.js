import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#27DA86',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
  subTitle: {
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 5,
    opacity: 0.85,
  },
});

class Feed extends Component {
  componentWillMount() {
    this.props.setAccountId('53e9df6c49dd517268000002');
    this.props.setTimelineId('568bb9588bc9f02ce7000001');
    this.props.setTimezone('3600');
    this.props.initStarsServices();
    // this.props.fetchEventSources();
  }

  componentDidMount() {
    this.props.fetchEvents();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          React Native Feed!
        </Text>
        <Text style={styles.subTitle}>
          by Applicaster
        </Text>

      </View>
    );
  }
}

Feed.propTypes = {
  events: PropTypes.func,
  initStarsServices: PropTypes.func,
  fetchEvents: PropTypes.func,
  fetchEventSources: PropTypes.func,
  setAccountId: PropTypes.func,
  setTimelineId: PropTypes.func,
  setTimezone: PropTypes.func,
};

export default Feed;
