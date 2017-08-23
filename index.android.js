import React from 'react';
import { AppRegistry } from 'react-native';

import App from './src/App';

const RNRoot = props => (
  <App { ...props } platform="android" />
);

AppRegistry.registerComponent('RNRoot', () => RNRoot);
