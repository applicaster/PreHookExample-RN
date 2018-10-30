import React from 'react';
import { AppRegistry, SafeAreaView } from 'react-native';

import App from './src/App';

const RNRoot = props => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <App { ...props } platform="iOS" />
    </SafeAreaView>
  );
};

AppRegistry.registerComponent('RNRoot', () => RNRoot);
