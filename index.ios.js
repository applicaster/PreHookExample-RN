import React from 'react';
import { AppRegistry, Platform, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';

import App from './src/App';

const RNRoot = props => {
  let { extra_props: initialAppProps } = props;
  if (Platform.OS === 'android') {
    initialAppProps = JSON.parse(initialAppProps);
  }

  const { colors } = initialAppProps;
  const backgroundColor = `#${colors.background_color.substring(2, 8)}`;

  return (
    <SafeAreaView style={{ backgroundColor, flex: 1 }}>
      <App { ...props } platform="iOS" />
    </SafeAreaView>
  );
};

RNRoot.propTypes = {
  extra_props: PropTypes.object,
};

AppRegistry.registerComponent('RNRoot', () => RNRoot);
