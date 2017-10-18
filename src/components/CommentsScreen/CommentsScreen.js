import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  Modal,
  View,
  ScrollView,
  Text,
} from 'react-native';
import EventContainer from '../EventContainer';
import CommentContainer from '../CommentContainer';
import MediaDetailsModal from '../MediaDetailsModal';
import BackButton from '../BackButton';

class CommentsScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    ...screenProps,
    headerTitle: "Comments",
    headerLeft: <BackButton onPress={() => {navigation.goBack(); }} />,
  });

  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem(data) {
    const { event } = this.props;
    const { item } = data;
    if (item.id === event.id) {
      return <EventContainer key={event.id} event={event} />;
    }
    
    return <CommentContainer key={item.id} comment={item} />;
  }

  render() {
    const { event, isMediaModalVisible, toggleModal } = this.props;
    const backgroundFeedColor = { backgroundColor: this.context.backgroundColor };
    const comments = [event].concat(event.comments);;
  
    return (<View style={[backgroundFeedColor]}>
        <FlatList
          data={comments}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id }
          style={[backgroundFeedColor]} contentContainerStyle={[backgroundFeedColor]}
          initialNumToRender={5}
          onEndReached={() => {}}
          onEndReachedThreshold={2}
        />
        <MediaDetailsModal />
    </View>
        
    );
  }
}

CommentsScreen.propTypes = {
  event: PropTypes.object,
  navigation: PropTypes.object,
};

CommentsScreen.contextTypes = {
  backgroundColor: PropTypes.string,
};

export default CommentsScreen;
