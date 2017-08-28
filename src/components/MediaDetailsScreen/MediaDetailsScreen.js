import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { styles } from './style';

class MediaDetailsScreen extends Component {
  render() {
    const { hideMediaDetailsModal } = this.props;
    const backgroundColor = { backgroundColor: this.context.backgroundColor, flex: 1 };
    return (
      <View style={[styles.mediaDetailsScreen, backgroundColor]}>
        <TouchableWithoutFeedback onPress={hideMediaDetailsModal}>
          <Image style={[styles.closeButton]} source={{ uri: 'close_button' }} />
        </TouchableWithoutFeedback>
        <Text style={{ color: 'white', alignSelf: 'center', marginTop: 50 }}>Hola Modal!</Text>
      </View>
    );
  }
}

MediaDetailsScreen.propTypes = {
  hideMediaDetailsModal: PropTypes.func,
};

MediaDetailsScreen.contextTypes = {
  backgroundColor: PropTypes.string,
};

export default MediaDetailsScreen;
