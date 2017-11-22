import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
} from 'react-native';
import { styles } from './style';

class CharacterCounter extends Component {
  render() {
    const { backgroundColor = '#FFFFFF', textColor = '#000000' } = this.context;
    const backgroundColorStyle = { backgroundColor: `${textColor}` };
    let textColorStyle = { color: backgroundColor };

    let { currentCharacters, maxCharacters } = this.props;
    if (currentCharacters > 999) {
      currentCharacters = '+999';
    }

    if (currentCharacters > maxCharacters) {
      textColorStyle = { color: '#FF0000' };
    }

    const charactersRemainingLabel = `${currentCharacters}/${maxCharacters}`;

    return (
      <View style={[styles.charactersRemainingContainer, backgroundColorStyle]}>
        <Text style={textColorStyle}>{charactersRemainingLabel}</Text>
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
  textColor: PropTypes.string,
};

export default CharacterCounter;
