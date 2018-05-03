import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  WebView,
} from 'react-native';
import BackButton from '../../components/BackButton';

class SocialWebViewScreen extends Component {
  static navigationOptions = ({ navigation, screenProps, params }) => ({
      ...screenProps,
      headerTitle: navigation.state.params.headerTitle,
      headerLeft: <BackButton onPress={() => {navigation.goBack(); }} />,
  });

  constructor(props) {
    super(props);
    this.state = { url: props.eventOriginUrl };
    this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
  }

  onNavigationStateChange(webViewState) {
    const { url } = webViewState;
    const { eventOriginUrl } = this.props;
    if (url === 'https://www.instagram.com/') {
      this.setState({ url: `${eventOriginUrl}?r=${Date.now()}` });
    }
  }

  render() {
    const { url } = this.state;
    const backgroundFeedColor = { backgroundColor: this.context.backgroundColor };
  
    return (
      <WebView source={{uri: url }} style={[backgroundFeedColor]} onNavigationStateChange={this.onNavigationStateChange} />
    );
  }
}

SocialWebViewScreen.propTypes = {
  eventOriginUrl: PropTypes.string,
};

SocialWebViewScreen.contextTypes = {
  backgroundColor: PropTypes.string,
};

export default SocialWebViewScreen;
