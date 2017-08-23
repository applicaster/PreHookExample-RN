import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
} from 'react-native';
import EventContainer from '../EventContainer';

const styles = StyleSheet.create({
  feed: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#323232',
  },
});

class Feed extends Component {
  static navigationOptions = ({ props }) => ({
    headerTitle: 'Feed',
    headerTitleStyle: styles.headerTitleStyle,
    headerStyle: styles.headerStyle,
  });

  getChildContext() {
    const { navigation } = this.props;
    return {
      navigation,
    }
  }

  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentWillMount() {
    this.props.setAccountId('500');
    this.props.setTimelineId('500');
    this.props.setTimezone('3600');
    this.props.setEnvironment('production');
    this.props.fetchSocialEvents();
  }

  onRefresh() {
    this.props.fetchSocialEvents();
  }

  render() {
    const { socialEvents, loading } = this.props;
    const backgroundFeedColor = { backgroundColor: this.context.backgroundColor };
    const refreshControl = (
      <RefreshControl
        refreshing={loading}
        onRefresh={this.onRefresh}
      />);
    
    return (
      <View style={[styles.feed, backgroundFeedColor]}>
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

Feed.contextTypes = {
  backgroundColor: PropTypes.string,
};

Feed.childContextTypes = {
  navigation: PropTypes.object,
};

export default Feed;
