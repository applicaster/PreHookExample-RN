import React, { Component } from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Map } from 'immutable';
import store from './store';
import { appInitialState } from './reducers/app';
import { eventsInitialState } from './reducers/events';
import AppNavigator from './AppNavigator';
import {
  iosTranslationMapping,
  androidTranslationMapping,
} from './utils/localization';

class App extends Component {
  getChildContext() {
    const appStyles = this.colors;
    return {
      ...appStyles,
    };
  }

  getColors(initialAppProps) {
    const { colors = {} } = initialAppProps;
    this.colors = {
      mainColor: (colors.main_color) ? `#${colors.main_color.substring(2, 8)}` : '#00D4ED',
      secondaryColor: (colors.secondary_color) ? `#${colors.secondary_color.substring(2, 8)}` : '#FFFFFF',
      textColor: (colors.text_color) ? `#${colors.text_color.substring(2, 8)}` : '#FFFFFF',
      secondaryTextColor: (colors.secondary_color) ? `#${colors.text_color.substring(2, 8)}` : '#00D4ED',
      backgroundColor: (colors.background_color) ? `#${colors.background_color.substring(2, 8)}` : '#505050',
    };

    return this.colors;
  }
  
  processLocalization(localization, feedTitle) {
    const localeTranslations = localization[Object.keys(localization)[0]];
    const translations = (Platform.OS === 'ios')
        ? iosTranslationMapping(localeTranslations, feedTitle)
        : androidTranslationMapping(localeTranslations, feedTitle);

    return translations;
  }

  render() {
    let { extra_props: initialAppProps } = this.props;
    const { localization } = this.props;

    if (Platform.OS === 'android') initialAppProps = JSON.parse(initialAppProps);

    const { accountId, timelineId, feedTitle, isLive, liveUrl, hasLive } = initialAppProps;
    const translations = this.processLocalization(localization, feedTitle);

    let { environment } = initialAppProps;
    if (environment && environment !== 'production') environment = 'development';
    
    const initialState = {
      app: Map(Object.assign(appInitialState.toJS(), {
        accountId,
        timelineId,
        environment,
        feedTitle,
      })),
      events: eventsInitialState,
      translations,
    };
    
    const { backgroundColor, mainColor, textColor } = this.colors || this.getColors(initialAppProps);

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
  extra_props: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  localization: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

App.childContextTypes = {
  mainColor: PropTypes.string,
  secondaryColor: PropTypes.string,
  textColor: PropTypes.string,
  secondaryTextColor: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default App;
