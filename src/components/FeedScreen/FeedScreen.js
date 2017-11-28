import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  FlatList,
  Modal,
  View,
  NativeModules,
  Platform,
} from 'react-native';
import EventContainer from '../EventContainer';
import MediaDetailsModal from '../MediaDetailsModal';
import WritePostModal from '../WritePostModal';
import CloseButton from '../CloseButton';
import WritePostButton from '../WritePostButton';

class FeedScreen extends Component {
  static navigationOptions = ({ screenProps }) => ({
    ...screenProps,
    headerLeft: <CloseButton onPress={FeedScreen.closeFeed} />,
  });

  static closeFeed() {
    return (Platform.OS === 'ios')
      ? NativeModules.ZPReactNativeBridgeListener.postEvent('dismiss_modal_view', { animated: 1 }, () => {})
      : NativeModules.APReactNativeBridge.handleCommand('stop', {});
  }

  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
  }

  getChildContext() {
    return { navigation: this.props.navigation };
  }

  componentWillMount() {
    this.props.setAccountId('59b7a7caf422c00009d974f0');
    this.props.setTimelineId('59b7cf76044ab9298c61afa3');
    this.props.setTimezone('3600');
    this.props.setEnvironment('production');
    this.props.fetchSocialEvents();
  }

  onRefresh() {
    this.props.fetchSocialEvents();
  }

  render() {
    const { isFacebookAvailable, isTwitterAvailable, socialEvents, loading, toggleModal } = this.props;
    const backgroundFeedColor = { backgroundColor: this.context.backgroundColor };
    return (
      <View style={[backgroundFeedColor, { flex: 1 }]}>
        <FlatList
          data={socialEvents}
          renderItem={({item}) => <EventContainer key={item.id} event={item} />}
          keyExtractor={(item) => item.id }
          style={[backgroundFeedColor]} contentContainerStyle={[backgroundFeedColor]}
          refreshing={loading}
          onRefresh={this.onRefresh}
          initialNumToRender={4}
          onEndReached={() => {}}
          onEndReachedThreshold={1}
        />
        <MediaDetailsModal />
        <WritePostModal />
        <WritePostButton />
      </View>
    );
  }
}

FeedScreen.propTypes = {
  fetchSocialEvents: PropTypes.func,
  isFacebookAvailable: PropTypes.bool,
  isTwitterAvailable: PropTypes.bool,
  loading: PropTypes.bool,
  setAccountId: PropTypes.func,
  setTimelineId: PropTypes.func,
  setTimezone: PropTypes.func,
  setEnvironment: PropTypes.func,
  socialEvents: PropTypes.array,
  navigation: PropTypes.object,
};

FeedScreen.contextTypes = {
  backgroundColor: PropTypes.string,
};

FeedScreen.childContextTypes = {
  navigation: PropTypes.object,
};

export default FeedScreen;
