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
    const { toggleModal } = this.props;
    const { backgroundColor, textColor = '#FFFFFF' } = this.context;
    const screenBackgroundColor = { backgroundColor, flex: 1 };
    const closeButtonColor = { tintColor: `${textColor}99` };
    return (
      <View style={[styles.mediaDetailsScreen, screenBackgroundColor]}>
        <TouchableWithoutFeedback onPress={toggleModal}>
          <Image style={[styles.closeButton, closeButtonColor]} source={{ uri: 'close_button' }} />
        </TouchableWithoutFeedback>
        <Text style={{ color: 'white', alignSelf: 'center', marginTop: 50 }}>Hola Modal!</Text>
      </View>
    );
  }
}

MediaDetailsScreen.propTypes = {
  toggleModal: PropTypes.func,
};

MediaDetailsScreen.contextTypes = {
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default MediaDetailsScreen;
