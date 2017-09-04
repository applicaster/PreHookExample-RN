import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  View,
  ScrollView,
  Text,
} from 'react-native';
import EventContainer from '../EventContainer';
import MediaDetailsScreen from '../MediaDetailsScreen';
// import { styles } from './style';

class CommentsScreen extends Component {
  static navigationOptions = ({ screenProps }) => ({
    ...screenProps 
  });

  render() {
    const { event } = this.props;
    const { comments } = event.comments; 
    const backgroundFeedColor = { backgroundColor: this.context.backgroundColor };
    
    return (
        <ScrollView style={[backgroundFeedColor]}>
          <EventContainer key={event.id} event={event} />
          {comments.map(comment =>
            <Text key={comment.id}>{comment.text}</Text>
          )}
          <Modal
          animationType={'fade'}
          transparent={false}
          visible={isMediaModalVisible}
          onRequestClose={toggleModal}
        >
          <MediaDetailsScreen />
        </Modal>
      </ScrollView>
    );
  }
}

CommentsScreen.propTypes = {
  event: PropTypes.object,
  navigation: PropTypes.object,
  isMediaModalVisible: PropTypes.bool,
  toggleModal: PropTypes.func,
};

CommentsScreen.contextTypes = {
  backgroundColor: PropTypes.string,
};

export default CommentsScreen;
