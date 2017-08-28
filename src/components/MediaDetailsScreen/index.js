import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';

class MediaDetailsScreen extends Component {
  static navigationOptions = ({ screenProps }) => ({
    ...screenProps,
  });

  getChildContext() {
    return { navigation: this.props.navigation };
  }

  render() {
    const backgroundColor = { backgroundColor: this.context.backgroundColor };
    return (
      <View style={[backgroundColor]}>
      </View>
    );
  }
}

MediaDetailsScreen.propTypes = {
  navigation: PropTypes.object,
};

MediaDetailsScreen.contextTypes = {
  backgroundColor: PropTypes.string,
};

MediaDetailsScreen.childContextTypes = {
  navigation: PropTypes.object,
};

export default MediaDetailsScreen;
