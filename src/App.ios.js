import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Feed from './components/Feed';

class App extends Component {
  render() {
    return (
      <Provider store={store()}>
        <Feed />
      </ Provider>
    );
  }
}

export default App;
