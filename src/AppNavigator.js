import React, { Component } from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import hexToRgb from 'hex-to-rgb';
import Navigator from './Navigator';

class AppNavigator extends Component {
  screenProperties() {
    const { headerTitle, headerBackgroundColor, headerTitleColor, borderColor } = this.props;
    const rgb = hexToRgb(borderColor);
    const borderRgbaColor = `rgba(${rgb[0]},${rgb[1]},${rgb[2]}, 0.3)`;
    return {
      title: headerTitle || 'No Feed Title',
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
  headerTitle: PropTypes.string,
  headerBackgroundColor: PropTypes.string,
  headerTitleColor: PropTypes.string,
  borderColor: PropTypes.string,
};

const mapStateToProps = (state) => ({
  navigation: state.navigation,
});

export default connect(mapStateToProps)(AppNavigator);
