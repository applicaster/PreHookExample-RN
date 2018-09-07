import React, { Component } from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Map } from 'immutable';
import store from './store';
import { appInitialState } from './reducers/app';
import { eventsInitialState } from './reducers/events';
import { zappPipesInitialState } from './reducers/zappPipes';
import AppNavigator from './AppNavigator';
import {
  iosTranslationMapping,
  androidTranslationMapping,
} from './utils/localization';

class App extends Component {
  getChildContext() {
    const appStyles = this.colors;
    const borderType = this.borderType;
    return {
      platform: Platform.OS,
      styles: {
        ...appStyles,
        borderType,
      },
    };
  }

  getColors(initialAppProps) {
    const { colors = {} } = initialAppProps;
    this.colors = {
      mainColor: (colors.main_color) ? `#${colors.main_color.substring(2, 8)}` : '#00D4ED',
      secondaryColor: (colors.secondary_color) ? `#${colors.secondary_color.substring(2, 8)}` : '#FFFFFF',
      textColor: (colors.text_color) ? `#${colors.text_color.substring(2, 8)}` : '#FFFFFF',
      secondaryTextColor: (colors.secondary_color) ? `#${colors.secondary_text_color.substring(2, 8)}` : '#00D4ED',
      backgroundColor: (colors.background_color) ? `#${colors.background_color.substring(2, 8)}` : '#505050',
    };

    return this.colors;
  }

  processLocalization(localization, feedTitle) {
    const localeTranslations = (Platform.OS === 'ios') ? localization[Object.keys(localization)[0]] : localization;
    const translations = (Platform.OS === 'ios')
      ? iosTranslationMapping(localeTranslations, feedTitle)
      : androidTranslationMapping(localeTranslations, feedTitle);

    return translations;
  }

  render() {
    let { extra_props: initialAppProps, localization } = this.props;

    if (Platform.OS === 'android') {
      initialAppProps = JSON.parse(initialAppProps);
      localization = JSON.parse(localization);
    }

    const appInitialStateProps = appInitialState.toJS();
    const getStringBooleanValue = (defaultValue, stringBoolean) => typeof stringBoolean === 'string' ? stringBoolean === 'true' : defaultValue;

    const {
      accountId,
      timelineId,
      feedTitle,
      isLive,
      liveUrl,
      hasLive,
      publicPageUrl,
      navigationStyle = appInitialStateProps.navigationStyle,
      borderType,
      isSocialPostingEnabled,
      zappPipesUrl,
      zappPipesUrlScheme,
      zappPipesType,
    } = initialAppProps;

    this.borderType = borderType;

    const translations = this.processLocalization(localization, feedTitle);

    let { environment } = initialAppProps;
    if (environment && environment !== 'production') environment = 'development';

    const initialState = {
      app: Map(Object.assign(appInitialState.toJS(), {
        accountId,
        navigationStyle,
        timelineId,
        environment,
        feedTitle,
        publicPageUrl,
        platform: Platform.OS,
        isSocialPostingEnabled:
          getStringBooleanValue(appInitialStateProps.isSocialPostingEnabled, isSocialPostingEnabled),
      })),
      events: eventsInitialState,
      translations,
      zappPipes: Map(Object.assign(zappPipesInitialState.toJS(), {
        dataSourceProviderUrl: `${zappPipesUrlScheme}://fetchData?type=${zappPipesType}&url=${zappPipesUrl}`,
      })),
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
  platform: PropTypes.string,
  styles: PropTypes.shape({
    mainColor: PropTypes.string,
    secondaryColor: PropTypes.string,
    textColor: PropTypes.string,
    secondaryTextColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    borderType: PropTypes.string,
  }),
};

export default App;
