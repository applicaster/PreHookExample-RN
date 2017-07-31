import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  Text,
} from 'react-native';
import EventContainer from '../EventContainer';

const styles = StyleSheet.create({
  feed: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#27DA86',
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

  render() {
    const socialEvents = this.props.socialEvents;
    const refreshControl = (
      <RefreshControl
        refreshing={this.props.loading}
        onRefresh={this.onRefresh}
      />);

    return (
      <View style={styles.feed}>
        <ScrollView refreshControl={refreshControl}>
          {socialEvents.map(event =>
            <EventContainer key={event.id} event={event} />
          )}
        </ScrollView>
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
