import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import store from './store';
import Feed from './components/Feed';

class App extends Component {
  getChildContext() {
    const { starlightStyles = {} } = this.props;
    const defaultStyles = {
      mainColor: '#7ED321',
      secondaryColor: '#FFFFFF',
      textColor: '#FFFFFF',
      secondaryTextColor: '#83F901',
      backgroundColor: '#272727',
    };

    return {
      mainColor: starlightStyles.main_color || defaultStyles.mainColor,
      secondaryColor: starlightStyles.secondary_color || defaultStyles.secondaryColor,
      textColor: starlightStyles.text_color || defaultStyles.textColor,
      secondaryTextColor: starlightStyles.secondary_text_color || defaultStyles.secondaryTextColor,
      backgroundColor: starlightStyles.background_color || defaultStyles.backgroundColor,
    };
  }
  
  render() {
    return (
      <Provider store={store()}>
        <Feed />
      </ Provider>
    );
  }
}

App.propTypes = {
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
