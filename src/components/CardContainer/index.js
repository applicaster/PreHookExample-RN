import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  NativeModules,
  LayoutAnimation,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { styles } from './style';

class CardContainer extends Component {
  onPress = () => {
    const { clickable, url } = this.props;

    if (clickable) {
      const { navigation } = this.context;
      navigation.navigate('GenericWebView', { headerTitle: '', url });
    }
  }

  render() {
    const { children } = this.props;

    return (
      <TouchableWithoutFeedback onPress={this.onPress} onPressIn={this.onPressIn} onPressOut={this.onPressOut}>
        <View style={[styles.cardContainer]}>
          {children}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

CardContainer.propTypes = {
  children: PropTypes.object.isRequired,
  clickable: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
};

CardContainer.contextTypes = {
  navigation: PropTypes.object,
};

export default CardContainer;
