import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#27DA86',
  },
  textEvent: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

class TextEvent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textEvent}>
          {this.props.text}
        </Text>
      </View>
    );
  }
}

TextEvent.propTypes = {
  text: PropTypes.string,
};

export default TextEvent;
