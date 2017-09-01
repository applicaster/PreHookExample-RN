import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  View,
  ScrollView,
  RefreshControl,
} from 'react-native';
import EventContainer from '../EventContainer';
import MediaDetailsScreen from '../MediaDetailsScreen';
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
    this.props.setAccountId('5656fa2569702d16f3040000');
    this.props.setTimelineId('59259ed0c6a7ab72c0a02041');
    this.props.setTimezone('3600');
    this.props.setEnvironment('production');
    this.props.fetchSocialEvents();
  }

  onRefresh() {
    this.props.fetchSocialEvents();
  }

  render() {
    const { socialEvents, loading, isMediaModalVisible, toggleModal } = this.props;
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
        <Modal
          animationType={'fade'}
          transparent={false}
          visible={isMediaModalVisible}
          onRequestClose={toggleModal}
        >
          <MediaDetailsScreen />
        </Modal>
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
  isMediaModalVisible: PropTypes.bool,
  toggleModal: PropTypes.func,
};

FeedScreen.contextTypes = {
  backgroundColor: PropTypes.string,
};

FeedScreen.childContextTypes = {
  navigation: PropTypes.object,
};

export default FeedScreen;
