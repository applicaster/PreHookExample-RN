import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
} from 'react-native';

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          I'm a React-native app for android!!!
        </Text>
        <Text style={styles.subTitle}>
          And this is nice
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#27DA86',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
  subTitle: {
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 5,
    opacity: 0.85,
  },
});

export default App;
