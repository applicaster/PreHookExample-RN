import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { styles } from './style';

export default class CardContainer extends Component {
  onPress() {
    const { clickable, clickHandler } = this.props;

    if (clickable) {
      clickHandler();
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
  clickable: PropTypes.bool,
  clickHandler: PropTypes.func,
};
