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
    const appStyles = this.getColors();
    return {
      ...appStyles,
    };
  }

  getColors() {
    const { extra_props: initialAppProps } = this.props;
    const { colors = {} } = initialAppProps;

    return {
      mainColor: (colors.main_color) ? `#${colors.main_color.substring(2, 8)}` : '#00D4ED', // '#7ED321'
      secondaryColor: (colors.secondary_color) ? `#${colors.secondary_color.substring(2, 8)}` : '#FFFFFF',
      textColor: (colors.text_color) ? `#${colors.text_color.substring(2, 8)}` : '#FFFFFF',
      secondaryTextColor: (colors.secondary_color) ? `#${colors.text_color.substring(2, 8)}` : '#00D4ED', // '#83F901'
      backgroundColor: (colors.background_color) ? `#${colors.background_color.substring(2, 8)}` : '#505050', // '#272727'
    };
  }
  
  render() {
    const { extra_props: initialAppProps } = this.props;
    const { accountId, timelineId, feedTitle, isLive, liveUrl, hasLive } = initialAppProps;
    let { environment } = initialAppProps;
    if (environment && environment !== 'production') environment = 'development';
    
    const initialState = {
      app: Map(Object.assign(appInitialState.toJS(), {
        accountId,
        timelineId,
        environment,
      })),
      events: eventsInitialState,
    };
    
    const { backgroundColor, mainColor, textColor } = this.getColors();

    return (
      <Provider store={store(initialState, environment = 'production')}>
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
  extra_props: PropTypes.object,
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
