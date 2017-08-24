import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import store from './store';
import AppNavigator from './AppNavigator';

class App extends Component {
  getChildContext() {
    const appStyles = this.getAppStyles();
    return {
      ...appStyles,
    };
  }

  getAppStyles() {
    const { starlightStyles = {} } = this.props;
    return {
      mainColor: starlightStyles.main_color || '#7ED321',
      secondaryColor: starlightStyles.secondary_color || '#FFFFFF',
      textColor: starlightStyles.text_color || '#FFFFFF',
      secondaryTextColor: starlightStyles.text_color || '#83F901',
      backgroundColor: starlightStyles.background_color || '#272727',
    };
  }
  
  render() {
    const { feedTitle } = this.props;
    const { backgroundColor, mainColor, textColor } = this.getAppStyles();

    return (
      <Provider store={store()}>
        <AppNavigator headerTitle={feedTitle} headerBackgroundColor={backgroundColor} headerTitleColor={mainColor} borderColor={textColor} />
      </Provider>
    );
  }
}

App.propTypes = {
  feedTitle: PropTypes.string,
  starlightStyles: PropTypes.object,
};

App.childContextTypes = {
  mainColor: PropTypes.string,
  secondaryColor: PropTypes.string,
  textColor: PropTypes.string,
  secondaryTextColor: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default App;
