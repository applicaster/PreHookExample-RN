import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
} from 'react-native';
import { styles } from './style';

class CharacterCounter extends Component {
  render() {
    const { backgroundColor = '#FFFFFF' } = this.context;
    const backgroundColorStyle = { backgroundColor: `${backgroundColor}46` };
    const defaultBackgroundColorStyle = { backgroundColor: '#FFFFFF' };

    let textColorStyle = { color: backgroundColor };

    let { currentCharacters } = this.props;
    const { maxCharacters } = this.props;
    if (currentCharacters > 999) {
      currentCharacters = '+999';
    }

    if (currentCharacters > maxCharacters) {
      textColorStyle = { color: '#FF0000' };
    }

    const charactersRemainingLabel = `${currentCharacters}/${maxCharacters}`;

    return (
      <View style={[styles.charactersRemainingContainerWrapper, defaultBackgroundColorStyle]}>
        <View style={[styles.charactersRemainingContainer, backgroundColorStyle]}>
          <Text style={[styles.charactersRemainingLabel, textColorStyle]}>{charactersRemainingLabel}</Text>
        </View>
      </View>
    );
  }
}

CharacterCounter.propTypes = {
  currentCharacters: PropTypes.number,
  maxCharacters: PropTypes.number,
};

CharacterCounter.contextTypes = {
  backgroundColor: PropTypes.string,
};

export default CharacterCounter;
