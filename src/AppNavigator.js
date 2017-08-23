import React from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppNavigator from './AppNavigator';

const RootNavigation = ({ dispatch, navigation }) => (
  <AppNavigator navigation={addNavigationHelpers({
    dispatch,
    state: navigation,
  })}
  />
);

RootNavigation.propTypes = {
  dispatch: PropTypes.func,
  navigation: PropTypes.object,
};

const mapStateToProps = (state) => ({
  navigation: state.navigation,
});

export default connect(mapStateToProps)(RootNavigation);
