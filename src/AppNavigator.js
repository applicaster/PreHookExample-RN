import React from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navigator from './Navigator';

const AppNavigator = ({ dispatch, navigation }) => (
  <Navigator navigation={addNavigationHelpers({
    dispatch,
    state: navigation,
  })}
  />
);

AppNavigator.propTypes = {
  dispatch: PropTypes.func,
  navigation: PropTypes.object,
};

const mapStateToProps = (state) => ({
  navigation: state.navigation,
});

export default connect(mapStateToProps)(AppNavigator);
