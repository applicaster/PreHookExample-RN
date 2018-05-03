import React, { Component } from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import hexToRgb from 'hex-to-rgb';
import Navigator from './Navigator';

class AppNavigator extends Component {
  screenProperties() {
    const { headerTitle, headerBackgroundColor, headerTitleColor, headerTintColor, borderColor, isLive, liveUrl, hasLive } = this.props;
    const rgb = hexToRgb(borderColor);
    const borderRgbaColor = `rgba(${rgb[0]},${rgb[1]},${rgb[2]}, 0.3)`;
    return {
      headerBackTitle: null,
      headerTintColor: `${headerTintColor}99`,
      headerTitle: headerTitle || 'Feed Title',
      headerStyle: {
        backgroundColor: headerBackgroundColor,
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomColor: borderRgbaColor,
      },
      headerTitleStyle: { color: headerTitleColor },
    };
  }

  render() {
    const { dispatch, navigation } = this.props;
    const screenProps = this.screenProperties();
    return (<Navigator screenProps={screenProps} navigation={addNavigationHelpers({
      dispatch,
      state: navigation,
    })}
    />);
  }
}

AppNavigator.propTypes = {
  dispatch: PropTypes.func,
  navigation: PropTypes.object,
  hasLive: PropTypes.bool,
  headerTitle: PropTypes.string,
  headerTintColor: PropTypes.string,
  headerBackgroundColor: PropTypes.string,
  headerTitleColor: PropTypes.string,
  borderColor: PropTypes.string,
  isLive: PropTypes.bool,
  liveUrl: PropTypes.string,
};

const mapStateToProps = (state) => ({
  navigation: state.navigation,
});

export default connect(mapStateToProps)(AppNavigator);
