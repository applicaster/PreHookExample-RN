import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { styles } from './style';

export default class CardContainer extends Component {
  onPress() {
    const { clickable, url } = this.props;

    if (clickable) {
      const { navigation } = this.context;
      navigation.navigate('GenericWebView', { headerTitle: '', url });
    }
  }

  render() {
    const { children } = this.props;

    return (
      <TouchableWithoutFeedback onPress={() => this.onPress()}>
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
  url: PropTypes.string,
};

CardContainer.contextTypes = {
  navigation: PropTypes.object,
};
