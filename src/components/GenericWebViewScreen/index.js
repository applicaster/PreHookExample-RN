import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  WebView,
} from 'react-native';
import BackButton from '../BackButton';

class GenericWebViewScreen extends Component {
  static navigationOptions = ({ navigation, screenProps, params }) => ({
      ...screenProps,
      headerTitle: navigation.state.params.headerTitle,
      headerLeft: <BackButton onPress={() => {navigation.goBack(); }} />,
  });

  constructor(props) {
    super(props);
  }

  render() {
    const { url } = this.props.navigation.state.params;
    const backgroundFeedColor = { backgroundColor: this.context.backgroundColor };
  
    return (
      <WebView source={{uri: url }} style={[backgroundFeedColor]} />
    );
  }
}

GenericWebViewScreen.propTypes = {
  url: PropTypes.string,
};

GenericWebViewScreen.contextTypes = {
  backgroundColor: PropTypes.string,
};

export default GenericWebViewScreen;
