import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  FlatList,
  Modal,
  View,
  NativeModule,
} from 'react-native';
import EventContainer from '../EventContainer';
import MediaDetailsModal from '../MediaDetailsModal';
import CloseButton from '../CloseButton';

class FeedScreen extends Component {
  static navigationOptions = ({ screenProps }) => ({
    ...screenProps,
    headerLeft: <CloseButton onPress={() => { NativeModule.dismiss_modal_view(true) }} />,
  });

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
    const { socialEvents, loading, toggleModal } = this.props;
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
