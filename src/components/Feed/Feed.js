import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  Image,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
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
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentWillMount() {
    this.props.setAccountId('100');
    this.props.setTimelineId('100');
    this.props.setTimezone('3600');
    this.props.setEnvironment('production');
    this.props.fetchSocialEvents();
  }

  onRefresh() {
    this.props.fetchSocialEvents();
  }

  renderCaption(caption) {
    return (caption && caption.text) ? caption.text : null;
  }

  render() {
    const socialEvents = this.props.socialEvents;
    const refreshControl = (
      <RefreshControl
        refreshing={this.props.loading}
        onRefresh={this.onRefresh}
      />);

    return (
      <View style={styles.container}>
        <ScrollView refreshControl={refreshControl}>
          {socialEvents.map(event =>
            <View key={event.id}>
              <Image
                style={{ width: 360, height: 360 }}
                source={{ uri: event.images.low_resolution.url }}
              />
              <Text>{this.renderCaption(event.caption)}</Text>
            </View>
          )}
        </ScrollView>
        <Text style={styles.subTitle}>
          by Applicaster
        </Text>
      </View>
    );
  }
}

Feed.propTypes = {
  loading: PropTypes.bool,
  socialEvents: PropTypes.array,
  fetchSocialEvents: PropTypes.func,
  setAccountId: PropTypes.func,
  setTimelineId: PropTypes.func,
  setTimezone: PropTypes.func,
  setEnvironment: PropTypes.func,
};

export default Feed;
