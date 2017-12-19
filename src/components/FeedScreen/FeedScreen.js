import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  DeviceEventEmitter,
  Dimensions,
  FlatList,
  Modal,
  View,
  NativeEventEmitter,
  NativeModules,
  Platform,
} from 'react-native';
import FeedRNUtils from '@applicaster/feed-rn-utils';
import EventContainer from '../EventContainer';
import ModalScreen from '../ModalScreen';
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
    this.props.fetchSocialEvents();
    
    const TWITTER_UPDATE_FAVORITES = 'twitter:updateFavorites';
    const { updateFavoriteTweets } = this.props;
    
    if (Platform.OS === 'ios') {
      const eventEmitter = new NativeEventEmitter(FeedRNUtils);
      this.updateTwitterFavoritesSubscription = eventEmitter.addListener(TWITTER_UPDATE_FAVORITES, updateFavoriteTweets);
    } else {
      DeviceEventEmitter.addListener(TWITTER_UPDATE_FAVORITES, updateFavoriteTweets);
    }
  }

  componentWillUnmount() {
    const { updateFavoriteTweets } = this.props;
    if (Platform.OS === 'ios') {
      this.updateTwitterFavoritesSubscription.remove();
      NativeEventEmitter.removeAllListeners();
    } else {
      DeviceEventEmitter.removeAllListeners();
    }
    
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
        <ModalScreen />
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
  socialEvents: PropTypes.array,
  navigation: PropTypes.object,
  updateFavoriteTweets: PropTypes.func,
};

FeedScreen.contextTypes = {
  backgroundColor: PropTypes.string,
};

FeedScreen.childContextTypes = {
  navigation: PropTypes.object,
};

export default FeedScreen;
