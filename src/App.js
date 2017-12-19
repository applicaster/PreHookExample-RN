import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Map } from 'immutable';
import store from './store';
import { appInitialState } from './reducers/app';
import { eventsInitialState } from './reducers/events';
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
      mainColor: starlightStyles.main_color || '#00D4ED', // '#7ED321'
      secondaryColor: starlightStyles.secondary_color || '#FFFFFF',
      textColor: starlightStyles.text_color || '#FFFFFF',
      secondaryTextColor: starlightStyles.text_color || '#00D4ED', // '#83F901'
      backgroundColor: starlightStyles.background_color || '#505050', // '#272727'
    };
  }
  
  render() {
    const { extra_props } = this.props;
    const { accountId, timelineId, feedTitle, isLive, liveUrl, hasLive, environment = 'development' } = extra_props;
    const { backgroundColor, mainColor, textColor } = this.getAppStyles();

    const initialState = {
      app: Map(Object.assign(appInitialState.toJS(), { accountId, timelineId, environment })),
      events: eventsInitialState,
    };

    return (
      <Provider store={store(initialState, 'production')}>
        <AppNavigator
          headerTitle={feedTitle}
          headerBackgroundColor={backgroundColor}
          headerTitleColor={mainColor}
          headerTintColor={textColor}
          borderColor={textColor}
          isLive={isLive}
          liveUrl={liveUrl}
          hasLive={hasLive}
        />
      </Provider>
    );
  }
}

App.propTypes = {
  feedTitle: PropTypes.string,
  isLive: PropTypes.bool,
  liveUrl: PropTypes.string,
  hasLive: PropTypes.bool,
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
