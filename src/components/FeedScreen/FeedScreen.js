import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  RefreshControl,
} from 'react-native';
import EventContainer from '../EventContainer';
import { styles } from './style';

class FeedScreen extends Component {
  static navigationOptions = ({ screenProps }) => ({
    ...screenProps 
  });

  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
  }

  getChildContext() {
    return { navigation: this.props.navigation };
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

FeedScreen.propTypes = {
  loading: PropTypes.bool,
  socialEvents: PropTypes.array,
  fetchSocialEvents: PropTypes.func,
  setAccountId: PropTypes.func,
  setTimelineId: PropTypes.func,
  setTimezone: PropTypes.func,
  setEnvironment: PropTypes.func,
  navigation: PropTypes.object,
};

FeedScreen.contextTypes = {
  backgroundColor: PropTypes.string,
};

FeedScreen.childContextTypes = {
  navigation: PropTypes.object,
};

export default FeedScreen;
