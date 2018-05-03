import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  DeviceEventEmitter,
  FlatList,
  View,
  NativeEventEmitter,
  NativeModules,
  Platform,
} from 'react-native';
import FeedRNUtils from '@applicaster/feed-rn-utils';
import { sendAnalyticEvent } from 'react-native-zapp-bridge';
import {
  CLOSE_FEED,
  OPEN_FEED,
} from '../../constants/analyticEvents';
import ModalScreen from '../ModalScreen';
import CloseButton from '../../buttons/CloseButton';
import WritePostButton from './components/WritePostButton';
import ImageCard from './cards/ImageCard';
import LinkCard from './cards/LinkCard';
import TextCard from './cards/TextCard';
import VideoCard from './cards/VideoCard';
import { styles } from './style';

export default class HomeScreen extends Component {
  static navigationOptions({ screenProps }) {
    return {
      ...screenProps,
      headerLeft: <CloseButton onPress={HomeScreen.closeFeed} />,
    };
  }

  static closeFeed() {
    sendAnalyticEvent(CLOSE_FEED, {}).then().catch();
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
    this.props.fetchEvents();
    
    const TWITTER_UPDATE_FAVORITES = 'twitter:updateFavorites';
    const { updateFavoriteTweets } = this.props;
    
    if (Platform.OS === 'ios') {
      const eventEmitter = new NativeEventEmitter(FeedRNUtils);
      this.updateTwitterFavoritesSubscription = eventEmitter.addListener(TWITTER_UPDATE_FAVORITES, updateFavoriteTweets);
    } else {
      DeviceEventEmitter.addListener(TWITTER_UPDATE_FAVORITES, updateFavoriteTweets);
    }
    sendAnalyticEvent(OPEN_FEED, {}).then().catch();
  }

  componentWillUnmount() {
    if (Platform.OS === 'ios') {
      this.updateTwitterFavoritesSubscription.remove();
      NativeEventEmitter.removeAllListeners();
    } else {
      DeviceEventEmitter.removeAllListeners();
    }
  }

  onRefresh() {
    this.props.fetchEvents();
  }

  renderItem({ item: event }) {
    const { caption, id, type, source, url, videoUrl } = event;
    const { url: imageUrl, height, width } = (event.images) ? event.images.default : {};

    if (type === 'image') {
      return (<ImageCard
        caption={caption}
        eventId={id}
        imageHeight={height}
        imageUrl={imageUrl}
        imageWidth={width}
      />);
    }

    if (type === 'link' && source === 'cms') {
      return (<LinkCard
        caption={caption}
        eventId={id}
        imageHeight={height}
        imageUrl={imageUrl}
        imageWidth={width}
        url={url}
      />);
    }
    
    if (type === 'text' || (type === 'link' && source === 'twitter')) {
      return (<TextCard
        caption={caption}
        eventId={id}
      />);
    }

    if (type === 'video') {
      return (<VideoCard
        caption={caption}
        eventId={id}
        imageHeight={height}
        imageUrl={imageUrl}
        imageWidth={width}
        videoUrl={videoUrl}
      />);
    }

    return null;
  }

  render() {
    const { events, isFacebookAvailable, isTwitterAvailable } = this.props;
    const backgroundFeedColor = { backgroundColor: this.context.secondaryTextColor };
    
    return (
      <View style={[backgroundFeedColor, { flex: 1 }]}>
        <FlatList
          data={Object.values(events)}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id }
          style={[styles.feedList]} contentContainerStyle={[styles.feedListContent]}
          refreshing={false}
          onRefresh={this.onRefresh}
          initialNumToRender={4}
          onEndReached={() => {}}
          onEndReachedThreshold={1}
        />
        <ModalScreen />
        {(isFacebookAvailable || isTwitterAvailable) && <WritePostButton />}
      </View>
    );
  }
}

HomeScreen.propTypes = {
  events: PropTypes.object.isRequired,
  fetchEvents: PropTypes.func.isRequired,
  isFacebookAvailable: PropTypes.bool.isRequired,
  isTwitterAvailable: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
  updateFavoriteTweets: PropTypes.func.isRequired,
};

HomeScreen.contextTypes = {
  secondaryTextColor: PropTypes.string,
};

HomeScreen.childContextTypes = {
  navigation: PropTypes.object,
};
