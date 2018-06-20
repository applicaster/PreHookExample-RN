import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  DeviceEventEmitter,
  FlatList,
  NativeEventEmitter,
  NativeModules,
  Platform,
  View,
} from 'react-native';
import FeedRNUtils from '@applicaster/feed-rn-utils';
import { sendAnalyticEvent } from 'react-native-zapp-bridge';
import { CLOSE_FEED, OPEN_FEED } from '../../constants/analyticEvents';
import ModalScreen from '../ModalScreen';
import CloseButton from '../../buttons/CloseButton';
import WritePostButton from './components/WritePostButton';
import ImageCard from './cards/ImageCard';
import LinkCard from './cards/LinkCard';
import TextCard from './cards/TextCard';
import ArticleCard from './cards/ArticleCard';
import VideoCard from './cards/VideoCard';
import PlaceHolderCard from './cards/PlacerHolderCard';
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
    this.handleItemsInViewport = this.handleItemsInViewport.bind(this);
    this.cardList = null;

    const viewabilityConfigForItemsInViewport = {
      viewabilityConfig: { minimumViewTime: 400, itemVisiblePercentThreshold: 75 },
      onViewableItemsChanged: this.handleItemsInViewport,
    };

    this.viewabilityConfigCallbackPairs = [viewabilityConfigForItemsInViewport];
  }

  getChildContext() {
    return { navigation: this.props.navigation };
  }

  componentWillMount() {
    this.props.fetchEvents();
    this.props.fetchZappPipes();
    
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
  
  handleItemsInViewport(items) {
    const { changedItems, viewableItems } = items;
    const { setViewableItems } = this.props;
    setViewableItems(viewableItems, changedItems);
  }

  renderEmptyList() {
    return ([
      <PlaceHolderCard key={1} />,
      <PlaceHolderCard key={2} />,
    ]);
  }

  renderItem({ item: event, index, listRef }) {
    const { body, caption, category, createdAt, id, type, source, url, user, videoUrl, summary } = event;
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

    if (type === 'link' && (source === 'cms' || source === 'zappPipes')) {
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
        category={category}
        eventId={id}
        imageHeight={height}
        imageUrl={imageUrl}
        imageWidth={width}
        index={index}
        listRef={listRef}
        videoUrl={videoUrl}
      />);
    }
    
    if (type === 'article') {
      return (<ArticleCard
        author={user.name}
        body={body}
        caption={caption}
        category={category}
        eventId={id}
        imageHeight={height}
        imageUrl={imageUrl}
        imageWidth={width}
        index={index}
        listRef={listRef}
        videoUrl={videoUrl}
        summary={summary}
        timestamp={createdAt}
      />);
    }

    return null;
  }

  render() {
    const { cards, isCardActive, isLoading } = this.props;
    const backgroundFeedColor = { backgroundColor: this.context.secondaryTextColor };

    return (
      <View style={[backgroundFeedColor, { flex: 1 }]}>
        <FlatList
          contentContainerStyle={[styles.feedListContent]}
          data={cards}
          initialNumToRender={3}
          keyExtractor={(item) => item.id }
          ListEmptyComponent={() => this.renderEmptyList()}
          onRefresh={this.onRefresh}
          refreshing={isLoading}
          renderItem={({ item, index }) => this.renderItem({ item, index, listRef: this.cardList }) }
          ref={view => { this.cardList = view; }}
          scrollEnabled={!isCardActive && !isLoading}
          style={[styles.feedList]}
          viewabilityConfigCallbackPairs={this.viewabilityConfigCallbackPairs}
        />
        <ModalScreen />
        <WritePostButton />
      </View>
    );
  }
}

HomeScreen.propTypes = {
  cards: PropTypes.array.isRequired,
  fetchEvents: PropTypes.func.isRequired,
  fetchZappPipes: PropTypes.func.isRequired,
  isCardActive: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
  updateFavoriteTweets: PropTypes.func.isRequired,
  setViewableItems: PropTypes.func.isRequired,
};

HomeScreen.contextTypes = {
  secondaryTextColor: PropTypes.string,
  textColor: PropTypes.string,
};

HomeScreen.childContextTypes = {
  navigation: PropTypes.object,
};

HomeScreen.defaultProps = {
  isCardActive: false,
};
